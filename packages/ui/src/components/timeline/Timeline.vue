<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { TimelineProps, TimelineSlots } from './types'
import { timelineDefaultProps } from './types'

defineOptions({ name: 'ATimeline' })
const props = withDefaults(defineProps<TimelineProps>(), timelineDefaultProps)
defineSlots<TimelineSlots>()
const slots = useSlots()

const hasPending = computed(() => {
  return props.pending !== undefined && props.pending !== false
})

const pendingText = computed(() => {
  if (typeof props.pending === 'string') return props.pending
  return ''
})

const classes = computed(() => ({
  'ant-timeline': true,
  'ant-timeline-pending': hasPending.value,
  'ant-timeline-reverse': props.reverse,
  [`ant-timeline-${props.mode}`]: !!props.mode,
}))
</script>

<template>
  <ul :class="classes">
    <slot />
    <li v-if="hasPending" class="ant-timeline-item ant-timeline-item-pending">
      <div class="ant-timeline-item-tail" />
      <div class="ant-timeline-item-head ant-timeline-item-head-blue">
        <slot name="pendingDot">
          <span class="ant-timeline-item-head-loading">
            <svg
              viewBox="0 0 1024 1024"
              width="1em"
              height="1em"
              fill="currentColor"
              class="ant-timeline-loading-icon"
            >
              <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 84 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.3 199.3 0 19.9-16.1 36-36 36z" />
            </svg>
          </span>
        </slot>
      </div>
      <div class="ant-timeline-item-content">
        <slot name="pending">{{ pendingText }}</slot>
      </div>
    </li>
  </ul>
</template>
