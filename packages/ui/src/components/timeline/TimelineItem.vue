<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { TimelineItemProps, TimelineItemSlots } from './types'
import { timelineItemDefaultProps } from './types'

defineOptions({ name: 'ATimelineItem' })
const props = withDefaults(defineProps<TimelineItemProps>(), timelineItemDefaultProps)
defineSlots<TimelineItemSlots>()
const slots = useSlots()

const PRESET_COLORS = ['blue', 'green', 'red', 'gray']

const isPresetColor = computed(() => PRESET_COLORS.includes(props.color ?? 'blue'))

const isCustomColor = computed(() => !isPresetColor.value)

const hasCustomDot = computed(() => !!slots.dot)

const itemClasses = computed(() => ({
  'ant-timeline-item': true,
  [`ant-timeline-item-${props.position}`]: !!props.position,
}))

const headClasses = computed(() => ({
  'ant-timeline-item-head': true,
  [`ant-timeline-item-head-${props.color}`]: isPresetColor.value,
  'ant-timeline-item-head-custom': hasCustomDot.value,
}))
</script>

<template>
  <li :class="itemClasses">
    <div v-if="$slots.label || label" class="ant-timeline-item-label">
      <slot name="label">{{ label }}</slot>
    </div>
    <div class="ant-timeline-item-tail" />
    <div
      :class="headClasses"
      :style="isCustomColor ? { borderColor: color, color: color } : undefined"
    >
      <slot name="dot" />
    </div>
    <div class="ant-timeline-item-content">
      <slot />
    </div>
  </li>
</template>
