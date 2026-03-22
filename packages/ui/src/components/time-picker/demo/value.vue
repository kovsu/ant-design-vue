<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'

const value = ref<Dayjs | null>(null)
const fixedValue = ref<Dayjs>(dayjs())

function onChange(time: Dayjs | null) {
  console.log(time)
  value.value = time
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px; max-width: 200px">
    <p>use value and @change</p>
    <a-time-picker :value="value" @change="onChange" />
    <p>v-model</p>
    <a-time-picker v-model:value="value" />
    <p>Do not change</p>
    <a-time-picker :value="fixedValue" />
  </div>
</template>
