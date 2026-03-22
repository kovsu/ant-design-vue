<template>
  <div style="display: flex; flex-direction: column; gap: 16px">
    <a-date-picker
      v-model:value="value1"
      :presets="datePresets"
      placeholder="Date with presets"
      @change="onDateChange"
    />
    <a-range-picker
      v-model:value="value2"
      :presets="rangePresets"
      @change="onRangeChange"
    />
    <a-range-picker
      v-model:value="value3"
      style="width: 400px"
      show-time
      format="YYYY/MM/DD HH:mm:ss"
      :presets="rangePresets"
      @change="onRangeChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'

const value1 = ref<Dayjs | null>(null)
const value2 = ref<[Dayjs, Dayjs] | null>(null)
const value3 = ref<[Dayjs, Dayjs] | null>(null)

const datePresets = [
  { label: 'Yesterday', value: dayjs().subtract(1, 'day') },
  { label: 'Last Week', value: dayjs().subtract(7, 'day') },
  { label: 'Last Month', value: dayjs().subtract(1, 'month') },
]

const rangePresets = [
  { label: 'Last 7 Days', value: [dayjs().subtract(7, 'day'), dayjs()] as [Dayjs, Dayjs] },
  { label: 'Last 14 Days', value: [dayjs().subtract(14, 'day'), dayjs()] as [Dayjs, Dayjs] },
  { label: 'Last 30 Days', value: [dayjs().subtract(30, 'day'), dayjs()] as [Dayjs, Dayjs] },
  { label: 'Last 90 Days', value: [dayjs().subtract(90, 'day'), dayjs()] as [Dayjs, Dayjs] },
]

function onDateChange(date: Dayjs | null, dateString: string) {
  console.log('Date changed:', date, dateString)
}

function onRangeChange(dates: [Dayjs, Dayjs] | null, dateStrings: [string, string]) {
  if (dates) {
    console.log('From:', dateStrings[0], 'To:', dateStrings[1])
  } else {
    console.log('Clear')
  }
}
</script>
