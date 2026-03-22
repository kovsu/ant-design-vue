<template>
  <div style="display: flex; flex-direction: column; gap: 16px">
    <a-range-picker v-model:value="value1" />
    <a-range-picker v-model:value="value2" show-time />
    <a-range-picker v-model:value="value3" picker="week" />
    <a-range-picker v-model:value="value4" picker="month" />
    <a-range-picker v-model:value="value5" picker="year" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Dayjs } from 'dayjs'

const value1 = ref<[Dayjs, Dayjs] | null>(null)
const value2 = ref<[Dayjs, Dayjs] | null>(null)
const value3 = ref<[Dayjs, Dayjs] | null>(null)
const value4 = ref<[Dayjs, Dayjs] | null>(null)
const value5 = ref<[Dayjs, Dayjs] | null>(null)
</script>
