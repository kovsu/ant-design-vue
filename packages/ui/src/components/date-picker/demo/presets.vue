<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px">
    <a-date-picker v-model:value="value" :presets="presets" placeholder="With presets" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'

const value = ref<Dayjs | null>(null)

const presets = [
  { label: 'Yesterday', value: dayjs().subtract(1, 'day') },
  { label: 'Last Week', value: dayjs().subtract(1, 'week') },
  { label: 'Last Month', value: dayjs().subtract(1, 'month') },
]
</script>
