<template>
  <div style="display: flex; flex-direction: column; gap: 16px">
    <a-date-picker placeholder="Custom suffix icon" @change="onChange">
      <template #suffixIcon>
        <SmileOutlined />
      </template>
    </a-date-picker>
    <a-date-picker placeholder="Select month" picker="month" @change="onChange">
      <template #suffixIcon>
        <SmileOutlined />
      </template>
    </a-date-picker>
    <a-range-picker @change="onRangeChange">
      <template #suffixIcon>
        <SmileOutlined />
      </template>
    </a-range-picker>
    <a-date-picker placeholder="Select week" picker="week" @change="onChange">
      <template #suffixIcon>
        <SmileOutlined />
      </template>
    </a-date-picker>
  </div>
</template>

<script setup lang="ts">
import { SmileOutlined } from '@ant-design/icons-vue'
import type { Dayjs } from 'dayjs'

function onChange(date: Dayjs | null, dateString: string) {
  console.log('Changed:', date, dateString)
}

function onRangeChange(dates: [Dayjs, Dayjs] | null, dateStrings: [string, string]) {
  console.log('Range changed:', dates, dateStrings)
}
</script>
