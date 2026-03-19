<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { ProgressProps, ProgressSlots } from './types'
import { progressDefaultProps } from './types'
import ProgressLine from './ProgressLine.vue'
import ProgressCircle from './ProgressCircle.vue'

defineOptions({ name: 'AProgress' })
const props = withDefaults(defineProps<ProgressProps>(), progressDefaultProps)
defineSlots<ProgressSlots>()
const slots = useSlots()

const validPercent = computed(() => Math.max(0, Math.min(100, props.percent)))

const progressStatus = computed(() => {
  if (props.status) return props.status
  if (validPercent.value >= 100) return 'success'
  return 'normal'
})

const circleSize = computed(() => {
  if (typeof props.size === 'number') return props.size
  if (Array.isArray(props.size)) return props.size[0]
  return props.size === 'small' ? 80 : 120
})

const circleStrokeWidth = computed(() => {
  if (Array.isArray(props.size)) return props.size[1] || 6
  return props.size === 'small' ? 5 : 6
})

const gapDeg = computed(() => {
  if (props.gapDegree != null) return props.gapDegree
  return props.type === 'dashboard' ? 75 : 0
})

const gapPos = computed(() => {
  return props.gapPosition || (props.type === 'dashboard' ? 'bottom' : 'top')
})

const showInfo = computed(() => props.showInfo)

const infoText = computed(() => {
  if (slots.format || slots.default) return null
  if (props.format) return props.format(validPercent.value, props.success?.percent)
  if (progressStatus.value === 'exception') return '\u2715'
  if (progressStatus.value === 'success') return '\u2713'
  return `${validPercent.value}%`
})

const classes = computed(() => ({
  'ant-progress': true,
  [`ant-progress-${props.type}`]: true,
  [`ant-progress-status-${progressStatus.value}`]: true,
  'ant-progress-show-info': showInfo.value,
  'ant-progress-small': props.size === 'small',
  'ant-progress-steps': !!props.steps,
}))
</script>

<template>
  <div
    :class="classes"
    role="progressbar"
    :aria-valuenow="validPercent"
    :aria-valuetext="`${validPercent}%`"
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <!-- Line / Steps -->
    <template v-if="type === 'line'">
      <ProgressLine
        :percent="validPercent"
        :success-percent="success?.percent"
        :stroke-color="strokeColor"
        :trail-color="trailColor"
        :stroke-linecap="strokeLinecap"
        :size="size"
        :steps="steps"
      />
      <span v-if="showInfo" class="ant-progress-text">
        <slot name="format" :percent="validPercent">
          <slot :percent="validPercent">
            {{ infoText }}
          </slot>
        </slot>
      </span>
    </template>

    <!-- Circle / Dashboard -->
    <template v-else>
      <div
        class="ant-progress-inner"
        :style="{ width: `${circleSize}px`, height: `${circleSize}px` }"
      >
        <ProgressCircle
          :percent="validPercent"
          :success-percent="success?.percent"
          :stroke-color="strokeColor"
          :trail-color="trailColor"
          :stroke-linecap="strokeLinecap"
          :stroke-width="circleStrokeWidth"
          :size="circleSize"
          :gap-degree="gapDeg"
          :gap-position="gapPos"
          :type="type"
        />
        <span v-if="showInfo" class="ant-progress-text">
          <slot name="format" :percent="validPercent">
            <slot :percent="validPercent">
              {{ infoText }}
            </slot>
          </slot>
        </span>
      </div>
    </template>
  </div>
</template>
