<script setup lang="ts">
import { computed, inject, useSlots } from 'vue'
import type { StepProps, StepSlots } from './types'
import { stepsContextKey } from './types'

defineOptions({ name: 'AStep' })
const props = defineProps<StepProps>()
defineSlots<StepSlots>()

const $slots = useSlots()
const context = inject(stepsContextKey, null)

// Register this step and get its index
const stepIndex = context?.registerStep() ?? 0

const currentStatus = computed(() => {
  if (props.status) return props.status
  if (!context) return 'wait'
  const current = context.current.value
  if (stepIndex < current) return 'finish'
  if (stepIndex === current) return context.status.value
  return 'wait'
})

const isClickable = computed(() => {
  return !props.disabled && !!context?.onStepClick
})

function handleClick() {
  if (isClickable.value) {
    context?.onStepClick?.(stepIndex)
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (isClickable.value && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault()
    context?.onStepClick?.(stepIndex)
  }
}

const hasTitle = computed(() => !!props.title || !!$slots.title)
const hasDescription = computed(() => !!props.description || !!$slots.description)
const hasSubTitle = computed(() => !!props.subTitle || !!$slots.subTitle)
const hasCustomIcon = computed(() => !!$slots.icon)

const iconContent = computed(() => {
  if (currentStatus.value === 'finish') return '\u2713'
  if (currentStatus.value === 'error') return '\u2715'
  return String(stepIndex + 1)
})

const classes = computed(() => ({
  'ant-steps-item': true,
  [`ant-steps-item-${currentStatus.value}`]: true,
  'ant-steps-item-disabled': props.disabled,
  'ant-steps-item-clickable': isClickable.value && !props.disabled,
  'ant-steps-item-custom': hasCustomIcon.value,
}))
</script>

<template>
  <div
    :class="classes"
    role="button"
    :tabindex="isClickable && !disabled ? 0 : undefined"
    :aria-current="currentStatus === 'process' ? 'step' : undefined"
    :aria-disabled="disabled || undefined"
    @click="handleClick"
    @keydown="handleKeydown"
  >
    <div class="ant-steps-item-container">
      <div class="ant-steps-item-tail" />
      <div class="ant-steps-item-icon">
        <slot name="icon">
          <span class="ant-steps-icon">{{ iconContent }}</span>
        </slot>
      </div>
      <div class="ant-steps-item-content">
        <div v-if="hasTitle" class="ant-steps-item-title">
          <slot name="title">{{ title }}</slot>
          <span v-if="hasSubTitle" class="ant-steps-item-subtitle">
            <slot name="subTitle">{{ subTitle }}</slot>
          </span>
        </div>
        <div v-if="hasDescription" class="ant-steps-item-description">
          <slot name="description">{{ description }}</slot>
        </div>
      </div>
    </div>
  </div>
</template>
