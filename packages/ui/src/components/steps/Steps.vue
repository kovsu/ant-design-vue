<script setup lang="ts">
import { computed, provide, ref, onBeforeUpdate } from 'vue'
import type { StepsProps, StepsEmits, StepsSlots } from './types'
import { stepsDefaultProps, stepsContextKey } from './types'

defineOptions({ name: 'ASteps' })
const props = withDefaults(defineProps<StepsProps>(), stepsDefaultProps)
const emit = defineEmits<StepsEmits>()
defineSlots<StepsSlots>()

// Step registration counter. Reset before each render via onBeforeUpdate.
const stepCounter = ref(0)

onBeforeUpdate(() => {
  stepCounter.value = 0
})

function handleStepClick(index: number) {
  emit('update:current', index)
  emit('change', index)
}

provide(stepsContextKey, {
  current: computed(() => props.current),
  status: computed(() => props.status),
  size: computed(() => props.size),
  direction: computed(() => props.direction),
  labelPlacement: computed(() => props.labelPlacement),
  percent: computed(() => props.percent),
  onStepClick: handleStepClick,
  registerStep: () => {
    return stepCounter.value++
  },
  unregisterStep: () => {
    // No-op: steps are reindexed on each render via counter reset
  },
})

const classes = computed(() => ({
  'ant-steps': true,
  [`ant-steps-${props.direction}`]: true,
  [`ant-steps-${props.size}`]: props.size !== 'default',
  'ant-steps-label-vertical': props.labelPlacement === 'vertical' && props.direction === 'horizontal',
  'ant-steps-navigation': props.type === 'navigation',
}))
</script>

<template>
  <div :class="classes" role="navigation" aria-label="Steps">
    <slot />
  </div>
</template>
