<script setup lang="ts">
import { computed, ref, watch, nextTick, onMounted } from 'vue'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { padZero, generateTimeOptions } from './utils'
import type { DisabledTimes } from './types'

defineOptions({ name: 'TimePanel' })

const props = withDefaults(defineProps<{
  value?: Dayjs | null
  defaultValue?: Dayjs | null
  showHour?: boolean
  showMinute?: boolean
  showSecond?: boolean
  use12Hours?: boolean
  hourStep?: number
  minuteStep?: number
  secondStep?: number
  disabledTime?: (date: Dayjs | null) => DisabledTimes
  hideDisabledOptions?: boolean
}>(), {
  showHour: true,
  showMinute: true,
  showSecond: true,
  use12Hours: false,
  hourStep: 1,
  minuteStep: 1,
  secondStep: 1,
  hideDisabledOptions: false,
})

const emit = defineEmits<{
  (e: 'select', date: Dayjs): void
}>()

const hourRef = ref<HTMLDivElement | null>(null)
const minuteRef = ref<HTMLDivElement | null>(null)
const secondRef = ref<HTMLDivElement | null>(null)
const ampmRef = ref<HTMLDivElement | null>(null)

const currentValue = computed(() => props.value ?? props.defaultValue ?? dayjs().startOf('day'))
const hour = computed(() => currentValue.value.hour())
const minute = computed(() => currentValue.value.minute())
const second = computed(() => currentValue.value.second())

const disabled = computed(() => props.disabledTime?.(props.value ?? null) ?? {})

const hours = computed(() => {
  const disabledList = props.hideDisabledOptions ? (disabled.value.disabledHours?.() ?? []) : []
  if (props.use12Hours) {
    return generateTimeOptions(12, props.hourStep, disabledList).map(h => h === 0 ? 12 : h)
  }
  return generateTimeOptions(24, props.hourStep, disabledList)
})

const minutes = computed(() => {
  const disabledList = props.hideDisabledOptions ? (disabled.value.disabledMinutes?.(hour.value) ?? []) : []
  return generateTimeOptions(60, props.minuteStep, disabledList)
})

const seconds = computed(() => {
  const disabledList = props.hideDisabledOptions
    ? (disabled.value.disabledSeconds?.(hour.value, minute.value) ?? [])
    : []
  return generateTimeOptions(60, props.secondStep, disabledList)
})

const isAM = computed(() => hour.value < 12)

function isHourDisabled(h: number): boolean {
  if (props.hideDisabledOptions) return false
  return disabled.value.disabledHours?.().includes(h) ?? false
}

function isMinuteDisabled(m: number): boolean {
  if (props.hideDisabledOptions) return false
  return disabled.value.disabledMinutes?.(hour.value)?.includes(m) ?? false
}

function isSecondDisabled(s: number): boolean {
  if (props.hideDisabledOptions) return false
  return disabled.value.disabledSeconds?.(hour.value, minute.value)?.includes(s) ?? false
}

function selectHour(h: number) {
  if (isHourDisabled(h)) return
  let newHour = h
  if (props.use12Hours) {
    newHour = isAM.value ? (h === 12 ? 0 : h) : (h === 12 ? 12 : h + 12)
  }
  emit('select', currentValue.value.hour(newHour))
}

function selectMinute(m: number) {
  if (isMinuteDisabled(m)) return
  emit('select', currentValue.value.minute(m))
}

function selectSecond(s: number) {
  if (isSecondDisabled(s)) return
  emit('select', currentValue.value.second(s))
}

function selectAmPm(am: boolean) {
  const h = hour.value
  const newHour = am ? (h >= 12 ? h - 12 : h) : (h < 12 ? h + 12 : h)
  emit('select', currentValue.value.hour(newHour))
}

function scrollToSelected(container: HTMLDivElement | null, selectedIdx: number) {
  if (!container) return
  const li = container.querySelectorAll('.ant-picker-time-panel-cell')[selectedIdx] as HTMLElement
  if (li) {
    li.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }
}

function scrollAllToSelected() {
  nextTick(() => {
    if (props.showHour) {
      const idx = hours.value.indexOf(props.use12Hours ? (hour.value % 12 || 12) : hour.value)
      scrollToSelected(hourRef.value, idx)
    }
    if (props.showMinute) {
      const idx = minutes.value.indexOf(minute.value)
      scrollToSelected(minuteRef.value, idx)
    }
    if (props.showSecond) {
      const idx = seconds.value.indexOf(second.value)
      scrollToSelected(secondRef.value, idx)
    }
  })
}

onMounted(scrollAllToSelected)
watch(() => props.value, scrollAllToSelected)
</script>

<template>
  <div class="ant-picker-time-panel">
    <div class="ant-picker-time-panel-column-wrap">
      <!-- Hours -->
      <ul v-if="showHour" ref="hourRef" class="ant-picker-time-panel-column">
        <li
          v-for="h in hours"
          :key="h"
          :class="{
            'ant-picker-time-panel-cell': true,
            'ant-picker-time-panel-cell-selected': (use12Hours ? (hour % 12 || 12) : hour) === h,
            'ant-picker-time-panel-cell-disabled': isHourDisabled(h),
          }"
          @click="selectHour(h)"
        >
          <div class="ant-picker-time-panel-cell-inner">{{ padZero(h) }}</div>
        </li>
      </ul>
      <!-- Minutes -->
      <ul v-if="showMinute" ref="minuteRef" class="ant-picker-time-panel-column">
        <li
          v-for="m in minutes"
          :key="m"
          :class="{
            'ant-picker-time-panel-cell': true,
            'ant-picker-time-panel-cell-selected': minute === m,
            'ant-picker-time-panel-cell-disabled': isMinuteDisabled(m),
          }"
          @click="selectMinute(m)"
        >
          <div class="ant-picker-time-panel-cell-inner">{{ padZero(m) }}</div>
        </li>
      </ul>
      <!-- Seconds -->
      <ul v-if="showSecond" ref="secondRef" class="ant-picker-time-panel-column">
        <li
          v-for="s in seconds"
          :key="s"
          :class="{
            'ant-picker-time-panel-cell': true,
            'ant-picker-time-panel-cell-selected': second === s,
            'ant-picker-time-panel-cell-disabled': isSecondDisabled(s),
          }"
          @click="selectSecond(s)"
        >
          <div class="ant-picker-time-panel-cell-inner">{{ padZero(s) }}</div>
        </li>
      </ul>
      <!-- AM/PM -->
      <ul v-if="use12Hours" ref="ampmRef" class="ant-picker-time-panel-column">
        <li
          :class="{
            'ant-picker-time-panel-cell': true,
            'ant-picker-time-panel-cell-selected': isAM,
          }"
          @click="selectAmPm(true)"
        >
          <div class="ant-picker-time-panel-cell-inner">AM</div>
        </li>
        <li
          :class="{
            'ant-picker-time-panel-cell': true,
            'ant-picker-time-panel-cell-selected': !isAM,
          }"
          @click="selectAmPm(false)"
        >
          <div class="ant-picker-time-panel-cell-inner">PM</div>
        </li>
      </ul>
    </div>
  </div>
</template>
