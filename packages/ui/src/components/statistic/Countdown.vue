<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useSlots } from 'vue'
import type { CountdownProps, CountdownEmits, CountdownSlots } from './types'
import { countdownDefaultProps } from './types'
import { getTime, formatCountdown } from './utils'

defineOptions({ name: 'AStatisticCountdown' })
const props = withDefaults(defineProps<CountdownProps>(), countdownDefaultProps)
const emit = defineEmits<CountdownEmits>()
defineSlots<CountdownSlots>()
const slots = useSlots()

const diff = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

function update() {
  const target = getTime(props.value)
  const now = Date.now()
  const newDiff = Math.max(0, target - now)

  if (newDiff !== diff.value) {
    diff.value = newDiff
    emit('change', newDiff)
  }

  if (newDiff <= 0) {
    stop()
    emit('finish')
  }
}

function start() {
  if (timer) return
  update()
  timer = setInterval(update, 1000 / 30) // ~30fps for smooth display
}

function stop() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

onMounted(start)
onBeforeUnmount(stop)

const displayText = computed(() => {
  return formatCountdown(diff.value, props.format!)
})

const hasTitle = computed(() => !!props.title || !!slots.title)
</script>

<template>
  <div class="ant-statistic ant-statistic-countdown" role="timer" aria-live="polite">
    <div v-if="hasTitle" class="ant-statistic-title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="ant-statistic-content" :style="valueStyle">
      <span v-if="slots.prefix" class="ant-statistic-content-prefix">
        <slot name="prefix" />
      </span>
      <span class="ant-statistic-content-value">{{ displayText }}</span>
      <span v-if="slots.suffix" class="ant-statistic-content-suffix">
        <slot name="suffix" />
      </span>
    </div>
  </div>
</template>
