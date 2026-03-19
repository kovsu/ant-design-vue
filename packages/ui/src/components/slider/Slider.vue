<script setup lang="ts">
import { computed, ref, watch, onBeforeUnmount } from 'vue'
import type { SliderProps, SliderEmits, SliderSlots, SliderMarks } from './types'
import { sliderDefaultProps } from './types'

defineOptions({ name: 'ASlider' })
const props = withDefaults(defineProps<SliderProps>(), sliderDefaultProps)
const emit = defineEmits<SliderEmits>()
defineSlots<SliderSlots>()

const sliderRef = ref<HTMLElement>()

// --- Internal state ---
const internalValue = ref<number | [number, number]>(
  props.value ?? props.defaultValue ?? (props.range ? [0, 0] : 0),
)

watch(
  () => props.value,
  (v) => {
    if (v !== undefined) internalValue.value = v
  },
)

const currentValue = computed(() =>
  props.value !== undefined ? props.value : internalValue.value,
)

// Normalize to always work with range values internally
const rangeValues = computed<[number, number]>(() => {
  const val = currentValue.value
  if (Array.isArray(val)) return [val[0], val[1]]
  return [props.min!, val as number]
})

const singleValue = computed(() => {
  const val = currentValue.value
  return Array.isArray(val) ? val[1] : val
})

// --- Value helpers ---
function clamp(value: number): number {
  return Math.min(Math.max(value, props.min!), props.max!)
}

function roundToStep(value: number): number {
  const step = props.step
  if (step === null || step === undefined) {
    // Marks-only mode: snap to nearest mark
    if (props.marks) {
      const markValues = Object.keys(props.marks).map(Number)
      let closest = markValues[0] ?? props.min!
      let minDist = Math.abs(value - closest)
      for (const mv of markValues) {
        const dist = Math.abs(value - mv)
        if (dist < minDist) {
          minDist = dist
          closest = mv
        }
      }
      return closest
    }
    return value
  }
  const steps = Math.round((value - props.min!) / step)
  return clamp(props.min! + steps * step)
}

function positionToValue(position: number): number {
  // position is 0-1 ratio
  const raw = props.min! + position * (props.max! - props.min!)
  return roundToStep(raw)
}

function valueToPercent(value: number): number {
  if (props.max! === props.min!) return 0
  return ((value - props.min!) / (props.max! - props.min!)) * 100
}

// --- Computed styles ---
const classes = computed(() => ({
  'ant-slider': true,
  'ant-slider-disabled': props.disabled,
  'ant-slider-vertical': props.vertical,
  'ant-slider-with-marks': !!props.marks,
}))

const trackStyle = computed(() => {
  if (!props.included) return { display: 'none' }

  const [low, high] = props.range
    ? [valueToPercent(rangeValues.value[0]), valueToPercent(rangeValues.value[1])]
    : [0, valueToPercent(singleValue.value)]

  const start = props.reverse ? 100 - high : low
  const length = high - low

  if (props.vertical) {
    return {
      bottom: `${start}%`,
      height: `${length}%`,
    }
  }
  return {
    left: `${start}%`,
    width: `${length}%`,
  }
})

const handleStyle = computed(() => {
  const percent = valueToPercent(singleValue.value)
  const pos = props.reverse ? 100 - percent : percent
  if (props.vertical) return { bottom: `${pos}%` }
  return { left: `${pos}%` }
})

const handleStartStyle = computed(() => {
  const percent = valueToPercent(rangeValues.value[0])
  const pos = props.reverse ? 100 - percent : percent
  if (props.vertical) return { bottom: `${pos}%` }
  return { left: `${pos}%` }
})

const handleEndStyle = computed(() => {
  const percent = valueToPercent(rangeValues.value[1])
  const pos = props.reverse ? 100 - percent : percent
  if (props.vertical) return { bottom: `${pos}%` }
  return { left: `${pos}%` }
})

// --- Marks ---
interface MarkItem {
  value: number
  label: string
  style: Record<string, string>
  active: boolean
}

const marksList = computed<MarkItem[]>(() => {
  if (!props.marks) return []
  return Object.entries(props.marks).map(([key, mark]) => {
    const value = Number(key)
    const percent = valueToPercent(value)
    const pos = props.reverse ? 100 - percent : percent
    const label = typeof mark === 'string' ? mark : mark.label
    const markStyle = typeof mark === 'object' && mark.style ? mark.style : {}
    const positionProp = props.vertical ? 'bottom' : 'left'
    const isActive = props.range
      ? value >= rangeValues.value[0] && value <= rangeValues.value[1]
      : value <= singleValue.value

    return {
      value,
      label,
      style: { ...markStyle, [positionProp]: `${pos}%` },
      active: props.included !== false && isActive,
    }
  })
})

// --- Dots ---
interface DotItem {
  value: number
  style: Record<string, string>
  active: boolean
}

const stepDots = computed<DotItem[]>(() => {
  const dots: DotItem[] = []
  const step = props.step
  if (!step && !props.marks) return dots

  // Collect dot positions from either step intervals or mark positions
  const positions: number[] = []

  if (props.dots && step) {
    for (let v = props.min!; v <= props.max!; v += step) {
      positions.push(v)
    }
  }

  if (props.marks) {
    for (const key of Object.keys(props.marks)) {
      const v = Number(key)
      if (!positions.includes(v)) {
        positions.push(v)
      }
    }
  }

  for (const v of positions) {
    const percent = valueToPercent(v)
    const pos = props.reverse ? 100 - percent : percent
    const positionProp = props.vertical ? 'bottom' : 'left'
    const isActive = props.range
      ? v >= rangeValues.value[0] && v <= rangeValues.value[1]
      : v <= singleValue.value

    dots.push({
      value: v,
      style: { [positionProp]: `${pos}%` },
      active: props.included !== false && isActive,
    })
  }

  return dots
})

// --- Drag handling ---
const draggingIndex = ref<number | null>(null)

function getPositionFromEvent(event: MouseEvent | Touch): number {
  if (!sliderRef.value) return 0
  const rect = sliderRef.value.getBoundingClientRect()
  let ratio: number

  if (props.vertical) {
    ratio = (rect.bottom - event.clientY) / rect.height
  } else {
    ratio = (event.clientX - rect.left) / rect.width
  }

  if (props.reverse) ratio = 1 - ratio
  return Math.min(Math.max(ratio, 0), 1)
}

function emitValue(val: number | [number, number]) {
  internalValue.value = val
  emit('update:value', val)
  emit('change', val)
}

function handleRailClick(event: MouseEvent) {
  if (props.disabled) return
  // Avoid handling if clicking on handle
  const target = event.target as HTMLElement
  if (target.classList.contains('ant-slider-handle')) return

  const position = getPositionFromEvent(event)
  const value = positionToValue(position)

  if (props.range) {
    const [low, high] = rangeValues.value
    // Determine which handle is closer
    const distToLow = Math.abs(value - low)
    const distToHigh = Math.abs(value - high)
    if (distToLow < distToHigh) {
      emitValue([clamp(value), high])
    } else {
      emitValue([low, clamp(value)])
    }
  } else {
    emitValue(clamp(value))
  }

  emit('afterChange', props.range ? [...rangeValues.value] as [number, number] : value)
}

function startDrag(handleIndex: number, event: MouseEvent) {
  if (props.disabled) return
  event.preventDefault()
  draggingIndex.value = handleIndex

  const onMouseMove = (e: MouseEvent) => {
    const position = getPositionFromEvent(e)
    const value = positionToValue(position)

    if (props.range) {
      const newValues: [number, number] = [...rangeValues.value]
      newValues[handleIndex] = clamp(value)
      // Ensure low <= high
      if (newValues[0] > newValues[1]) {
        const tmp = newValues[0]
        newValues[0] = newValues[1]
        newValues[1] = tmp
      }
      emitValue(newValues)
    } else {
      emitValue(clamp(value))
    }
  }

  const onMouseUp = () => {
    draggingIndex.value = null
    const val = currentValue.value
    emit('afterChange', Array.isArray(val) ? [...val] as [number, number] : val)
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }

  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}

function handleKeydown(handleIndex: number, event: KeyboardEvent) {
  if (props.disabled) return
  const step = props.step ?? 1
  let delta = 0

  if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
    delta = step
    event.preventDefault()
  } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
    delta = -step
    event.preventDefault()
  } else if (event.key === 'Home') {
    delta = props.min! - (props.range ? rangeValues.value[handleIndex] : singleValue.value)
    event.preventDefault()
  } else if (event.key === 'End') {
    delta = props.max! - (props.range ? rangeValues.value[handleIndex] : singleValue.value)
    event.preventDefault()
  }

  if (delta === 0) return

  if (props.reverse) delta = -delta

  if (props.range) {
    const newValues: [number, number] = [...rangeValues.value]
    newValues[handleIndex] = clamp(newValues[handleIndex] + delta)
    if (newValues[0] > newValues[1]) {
      const tmp = newValues[0]
      newValues[0] = newValues[1]
      newValues[1] = tmp
    }
    emitValue(newValues)
    emit('afterChange', [...newValues] as [number, number])
  } else {
    const newVal = clamp(singleValue.value + delta)
    emitValue(newVal)
    emit('afterChange', newVal)
  }
}

onBeforeUnmount(() => {
  draggingIndex.value = null
})
</script>

<template>
  <div
    ref="sliderRef"
    :class="classes"
    @mousedown="handleRailClick"
  >
    <div class="ant-slider-rail" />
    <div class="ant-slider-track" :style="trackStyle" />

    <!-- Steps/dots -->
    <div v-if="dots || marks" class="ant-slider-step">
      <span
        v-for="dot in stepDots"
        :key="dot.value"
        :class="['ant-slider-dot', { 'ant-slider-dot-active': dot.active }]"
        :style="dot.style"
      />
    </div>

    <!-- Marks -->
    <div v-if="marks" class="ant-slider-mark">
      <span
        v-for="mark in marksList"
        :key="mark.value"
        :class="['ant-slider-mark-text', { 'ant-slider-mark-text-active': mark.active }]"
        :style="mark.style"
      >
        <slot name="mark" :label="mark.label" :value="mark.value">
          {{ mark.label }}
        </slot>
      </span>
    </div>

    <!-- Handle(s) -->
    <div
      v-if="!range"
      class="ant-slider-handle"
      :style="handleStyle"
      role="slider"
      :aria-valuemin="min"
      :aria-valuemax="max"
      :aria-valuenow="singleValue"
      :aria-disabled="disabled || undefined"
      :tabindex="disabled ? -1 : 0"
      @mousedown.stop="startDrag(0, $event)"
      @keydown="handleKeydown(0, $event)"
    />
    <template v-else>
      <div
        class="ant-slider-handle"
        :style="handleStartStyle"
        role="slider"
        :aria-valuemin="min"
        :aria-valuemax="max"
        :aria-valuenow="rangeValues[0]"
        :aria-disabled="disabled || undefined"
        :tabindex="disabled ? -1 : 0"
        @mousedown.stop="startDrag(0, $event)"
        @keydown="handleKeydown(0, $event)"
      />
      <div
        class="ant-slider-handle"
        :style="handleEndStyle"
        role="slider"
        :aria-valuemin="min"
        :aria-valuemax="max"
        :aria-valuenow="rangeValues[1]"
        :aria-disabled="disabled || undefined"
        :tabindex="disabled ? -1 : 0"
        @mousedown.stop="startDrag(1, $event)"
        @keydown="handleKeydown(1, $event)"
      />
    </template>
  </div>
</template>
