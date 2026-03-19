<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'
import type { RateProps, RateEmits, RateSlots } from './types'
import { rateDefaultProps } from './types'

defineOptions({ name: 'ARate' })
const props = withDefaults(defineProps<RateProps>(), rateDefaultProps)
const emit = defineEmits<RateEmits>()
defineSlots<RateSlots>()

const rateRef = ref<HTMLElement>()
const internalValue = ref(props.value ?? props.defaultValue ?? 0)

watch(
  () => props.value,
  (v) => {
    if (v !== undefined) internalValue.value = v
  },
)

const currentValue = computed(() =>
  props.value !== undefined ? props.value : internalValue.value,
)

const hoverValue = ref(0)
const isHovering = ref(false)

const displayValue = computed(() =>
  isHovering.value ? hoverValue.value : currentValue.value,
)

function getStarValue(index: number, isHalf: boolean): number {
  return isHalf && props.allowHalf ? index + 0.5 : index + 1
}

function setValue(val: number) {
  internalValue.value = val
  emit('update:value', val)
  emit('change', val)
}

function handleClick(index: number, isHalf: boolean) {
  if (props.disabled) return
  let val = getStarValue(index, isHalf)
  if (props.allowClear && val === currentValue.value) {
    val = 0
  }
  setValue(val)
}

function handleHover(index: number, isHalf: boolean) {
  if (props.disabled) return
  const val = getStarValue(index, isHalf)
  hoverValue.value = val
  isHovering.value = true
  emit('hoverChange', val)
}

function handleMouseLeave() {
  if (props.disabled) return
  isHovering.value = false
  hoverValue.value = 0
  emit('hoverChange', 0)
}

function handleKeydown(e: KeyboardEvent) {
  if (props.disabled) return
  emit('keydown', e)
  const step = props.allowHalf ? 0.5 : 1
  let val = currentValue.value

  if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
    val = Math.min(val + step, props.count!)
    e.preventDefault()
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
    val = Math.max(val - step, 0)
    e.preventDefault()
  }

  if (val !== currentValue.value) {
    setValue(val)
  }
}

function getStarClass(index: number): string {
  const val = displayValue.value
  if (val >= index + 1) return 'ant-rate-star-full'
  if (val >= index + 0.5 && props.allowHalf) return 'ant-rate-star-half'
  return 'ant-rate-star-zero'
}

onMounted(() => {
  if (props.autofocus && rateRef.value) {
    rateRef.value.focus()
  }
})
</script>

<template>
  <ul
    ref="rateRef"
    :class="['ant-rate', { 'ant-rate-disabled': disabled }]"
    role="radiogroup"
    :tabindex="disabled ? -1 : 0"
    @mouseleave="handleMouseLeave"
    @keydown="handleKeydown"
    @focus="emit('focus', $event)"
    @blur="emit('blur', $event)"
  >
    <li
      v-for="i in count"
      :key="i"
      :class="['ant-rate-star', getStarClass(i - 1)]"
      role="radio"
      :aria-checked="currentValue >= i"
      :aria-posinset="i"
      :aria-setsize="count"
    >
      <div
        v-if="allowHalf"
        class="ant-rate-star-first"
        @click="handleClick(i - 1, true)"
        @mousemove="handleHover(i - 1, true)"
      >
        <slot name="character">{{ character }}</slot>
      </div>
      <div
        class="ant-rate-star-second"
        @click="handleClick(i - 1, false)"
        @mousemove="handleHover(i - 1, false)"
      >
        <slot name="character">{{ character }}</slot>
      </div>
    </li>
  </ul>
</template>
