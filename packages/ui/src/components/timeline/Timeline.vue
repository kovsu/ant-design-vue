<script setup lang="ts">
import { computed, useSlots } from 'vue'
import LoadingOutlined from '@ant-design/icons-vue/LoadingOutlined'
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
          <LoadingOutlined class="ant-timeline-loading-icon" />
        </slot>
      </div>
      <div class="ant-timeline-item-content">
        <slot name="pending">{{ pendingText }}</slot>
      </div>
    </li>
  </ul>
</template>
