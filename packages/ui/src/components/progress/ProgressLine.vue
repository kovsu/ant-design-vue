<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  percent: number
  successPercent?: number
  strokeColor?: string | string[] | Record<string, string>
  trailColor?: string
  strokeLinecap: string
  size: 'small' | 'default' | number | [number, number]
  steps?: number
}>()

const strokeHeight = computed(() => {
  if (Array.isArray(props.size)) return `${props.size[1]}px`
  if (typeof props.size === 'number') return `${props.size}px`
  return props.size === 'small' ? '6px' : '8px'
})

const strokeWidth = computed(() => {
  if (Array.isArray(props.size)) return `${props.size[0]}px`
  return undefined
})

const percentStyle = computed(() => {
  const style: Record<string, string> = {
    width: `${Math.min(props.percent, 100)}%`,
    height: strokeHeight.value,
    borderRadius: props.strokeLinecap === 'round' ? '100px' : '0',
  }
  if (typeof props.strokeColor === 'string') {
    style.background = props.strokeColor
  } else if (Array.isArray(props.strokeColor)) {
    style.background = `linear-gradient(to right, ${props.strokeColor.join(', ')})`
  } else if (props.strokeColor && typeof props.strokeColor === 'object') {
    const gradient = props.strokeColor as Record<string, string>
    const dir = gradient.direction || 'to right'
    const from = gradient.from
    const to = gradient.to
    if (from && to) {
      style.background = `linear-gradient(${dir}, ${from}, ${to})`
    }
  }
  return style
})

const successStyle = computed(() => {
  if (!props.successPercent) return null
  return {
    width: `${Math.min(props.successPercent, 100)}%`,
    height: strokeHeight.value,
    borderRadius: props.strokeLinecap === 'round' ? '100px' : '0',
  }
})

const trailStyle = computed(() => ({
  height: strokeHeight.value,
  width: strokeWidth.value,
  borderRadius: props.strokeLinecap === 'round' ? '100px' : '0',
  backgroundColor: props.trailColor || undefined,
}))

// Steps mode
const stepsNodes = computed(() => {
  if (!props.steps) return null
  const stepWidth = 100 / props.steps
  const filledSteps = Math.round((props.percent / 100) * props.steps)
  return Array.from({ length: props.steps }, (_, i) => ({
    filled: i < filledSteps,
    width: `${stepWidth}%`,
  }))
})
</script>

<template>
  <!-- Steps mode -->
  <div v-if="stepsNodes" class="ant-progress-steps-outer">
    <div
      v-for="(step, i) in stepsNodes"
      :key="i"
      class="ant-progress-steps-item"
      :class="{ 'ant-progress-steps-item-active': step.filled }"
      :style="{ height: strokeHeight }"
    />
  </div>
  <!-- Line mode -->
  <div v-else class="ant-progress-outer">
    <div class="ant-progress-inner" :style="trailStyle">
      <div class="ant-progress-bg" :style="percentStyle" />
      <div v-if="successStyle" class="ant-progress-success-bg" :style="successStyle" />
    </div>
  </div>
</template>
