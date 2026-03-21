<script setup lang="ts">
import { computed, ref, watch, onMounted, nextTick } from 'vue'
import type { SegmentedProps, SegmentedEmits, SegmentedSlots, SegmentedOption, SegmentedValue } from './types'
import { segmentedDefaultProps } from './types'

defineOptions({ name: 'ASegmented' })
const props = withDefaults(defineProps<SegmentedProps>(), segmentedDefaultProps)
const emit = defineEmits<SegmentedEmits>()
defineSlots<SegmentedSlots>()

// Internal state for uncontrolled mode
const internalValue = ref<SegmentedValue | undefined>(props.value)

const mergedValue = computed(() => props.value ?? internalValue.value)

// Normalize options to always be SegmentedOption objects
const normalizedOptions = computed<SegmentedOption[]>(() =>
  props.options.map((opt) => {
    if (typeof opt === 'string' || typeof opt === 'number') {
      return { value: opt, label: String(opt) }
    }
    return { ...opt, label: opt.label ?? String(opt.value) }
  }),
)

// Refs for measuring option positions
const optionRefs = ref<HTMLElement[]>([])
const containerRef = ref<HTMLElement | null>(null)

// Thumb position and size
const thumbStyle = ref<Record<string, string>>({})

function setOptionRef(el: any, index: number) {
  if (el) {
    optionRefs.value[index] = el as HTMLElement
  }
}

function updateThumb() {
  const activeIndex = normalizedOptions.value.findIndex(
    (opt) => opt.value === mergedValue.value,
  )
  if (activeIndex < 0 || !containerRef.value) {
    thumbStyle.value = { display: 'none' }
    return
  }
  const el = optionRefs.value[activeIndex]
  if (!el) {
    thumbStyle.value = { display: 'none' }
    return
  }
  const containerRect = containerRef.value.getBoundingClientRect()
  const elRect = el.getBoundingClientRect()
  thumbStyle.value = {
    left: `${elRect.left - containerRect.left}px`,
    width: `${elRect.width}px`,
  }
}

watch(mergedValue, () => {
  nextTick(updateThumb)
})

watch(
  () => props.options,
  () => {
    nextTick(updateThumb)
  },
)

onMounted(() => {
  nextTick(updateThumb)
})

function handleSelect(opt: SegmentedOption) {
  if (opt.disabled || props.disabled) return
  internalValue.value = opt.value
  emit('update:value', opt.value)
  emit('change', opt.value)
}

function handleKeydown(event: KeyboardEvent, index: number) {
  const len = normalizedOptions.value.length
  let targetIndex = -1

  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
    event.preventDefault()
    // Find the next non-disabled option
    for (let i = 1; i <= len; i++) {
      const next = (index + i) % len
      if (!normalizedOptions.value[next].disabled) {
        targetIndex = next
        break
      }
    }
  } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
    event.preventDefault()
    // Find the previous non-disabled option
    for (let i = 1; i <= len; i++) {
      const prev = (index - i + len) % len
      if (!normalizedOptions.value[prev].disabled) {
        targetIndex = prev
        break
      }
    }
  }

  if (targetIndex >= 0) {
    const opt = normalizedOptions.value[targetIndex]
    handleSelect(opt)
    optionRefs.value[targetIndex]?.focus()
  }
}

const classes = computed(() => ({
  'ant-segmented': true,
  'ant-segmented-block': props.block,
  'ant-segmented-sm': props.size === 'sm',
  'ant-segmented-lg': props.size === 'lg',
  'ant-segmented-disabled': props.disabled,
}))
</script>

<template>
  <div ref="containerRef" :class="classes" role="radiogroup">
    <div class="ant-segmented-group">
      <div
        class="ant-segmented-thumb"
        :style="thumbStyle"
        aria-hidden="true"
      />
      <label
        v-for="(opt, index) in normalizedOptions"
        :key="opt.value"
        :ref="(el) => setOptionRef(el, index)"
        :class="{
          'ant-segmented-item': true,
          'ant-segmented-item-selected': mergedValue === opt.value,
          'ant-segmented-item-disabled': opt.disabled || disabled,
          [opt.className || '']: !!opt.className,
        }"
        role="radio"
        :aria-checked="mergedValue === opt.value"
        :aria-disabled="opt.disabled || disabled || undefined"
        :tabindex="opt.disabled || disabled ? -1 : mergedValue === opt.value ? 0 : -1"
        @click="handleSelect(opt)"
        @keydown="handleKeydown($event, index)"
      >
        <input
          type="radio"
          class="ant-segmented-item-input"
          :value="opt.value"
          :checked="mergedValue === opt.value"
          :disabled="opt.disabled || disabled"
          :title="opt.title || (typeof opt.label === 'string' ? opt.label : String(opt.value))"
        />
        <span class="ant-segmented-item-label">
          <slot name="label" :value="opt.value" :label="typeof opt.label === 'string' ? opt.label : String(opt.value)" :disabled="opt.disabled">
            {{ typeof opt.label === 'string' ? opt.label : opt.value }}
          </slot>
        </span>
      </label>
    </div>
  </div>
</template>
