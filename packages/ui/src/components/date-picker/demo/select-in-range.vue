<template>
  <div style="max-width: 300px">
    <a-range-picker
      :value="hackValue || value"
      :disabled-date="disabledDate"
      @change="onChange"
      @openChange="onOpenChange"
      @calendarChange="onCalendarChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Dayjs } from 'dayjs'

type RangeValue = [Dayjs, Dayjs]

const dates = ref<RangeValue>()
const value = ref<RangeValue>()
const hackValue = ref<RangeValue>()

function disabledDate(current: Dayjs): boolean {
  if (!dates.value || dates.value.length === 0) {
    return false
  }
  const tooLate = dates.value[0] && current.diff(dates.value[0], 'days') > 7
  const tooEarly = dates.value[1] && dates.value[1].diff(current, 'days') > 7
  return !!tooEarly || !!tooLate
}

function onOpenChange(open: boolean) {
  if (open) {
    dates.value = [] as unknown as RangeValue
    hackValue.value = [] as unknown as RangeValue
  } else {
    hackValue.value = undefined
  }
}

function onChange(val: RangeValue) {
  value.value = val
}

function onCalendarChange(val: RangeValue) {
  dates.value = val
}
</script>
