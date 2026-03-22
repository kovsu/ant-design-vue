<template>
  <div style="display: flex; flex-direction: column; gap: 16px">
    <a-date-picker
      v-model:value="value1"
      format="YYYY-MM-DD HH:mm:ss"
      :disabled-date="disabledDate"
      :disabled-time="disabledDateTime"
      :show-time="{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }"
      placeholder="Disabled date & time"
    />
    <a-date-picker
      v-model:value="value2"
      :disabled-date="disabledDate"
      picker="month"
      placeholder="Disabled months"
    />
    <a-range-picker v-model:value="value3" :disabled-date="disabledDate" />
    <a-range-picker
      v-model:value="value4"
      style="width: 400px"
      :disabled-date="disabledDate"
      :disabled-time="disabledRangeTime"
      :show-time="{
        hideDisabledOptions: true,
        defaultValue: [dayjs('00:00:00', 'HH:mm:ss'), dayjs('11:59:59', 'HH:mm:ss')],
      }"
      format="YYYY-MM-DD HH:mm:ss"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'

const value1 = ref<Dayjs | null>(null)
const value2 = ref<Dayjs | null>(null)
const value3 = ref<[Dayjs, Dayjs] | null>(null)
const value4 = ref<[Dayjs, Dayjs] | null>(null)

function range(start: number, end: number): number[] {
  const result: number[] = []
  for (let i = start; i < end; i++) {
    result.push(i)
  }
  return result
}

function disabledDate(current: Dayjs): boolean {
  return current && current < dayjs().endOf('day')
}

function disabledDateTime() {
  return {
    disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56],
  }
}

function disabledRangeTime(_: Dayjs | null, type: 'start' | 'end') {
  if (type === 'start') {
    return {
      disabledHours: () => range(0, 60).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    }
  }
  return {
    disabledHours: () => range(0, 60).splice(20, 4),
    disabledMinutes: () => range(0, 31),
    disabledSeconds: () => [55, 56],
  }
}
</script>
