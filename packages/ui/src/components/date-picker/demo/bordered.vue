<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <a-date-picker v-model:value="value1" :bordered="false" placeholder="Date" />
    <a-date-picker v-model:value="value2" picker="week" :bordered="false" placeholder="Week" />
    <a-date-picker v-model:value="value3" picker="month" :bordered="false" placeholder="Month" />
    <a-date-picker v-model:value="value4" picker="quarter" :bordered="false" placeholder="Quarter" />
    <a-date-picker v-model:value="value5" picker="year" :bordered="false" placeholder="Year" />

    <a-range-picker v-model:value="value6" :bordered="false" />
    <a-range-picker v-model:value="value7" picker="week" :bordered="false" />
    <a-range-picker v-model:value="value8" picker="month" :bordered="false" />
    <a-range-picker v-model:value="value9" picker="year" :bordered="false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Dayjs } from 'dayjs'

const value1 = ref<Dayjs | null>(null)
const value2 = ref<Dayjs | null>(null)
const value3 = ref<Dayjs | null>(null)
const value4 = ref<Dayjs | null>(null)
const value5 = ref<Dayjs | null>(null)
const value6 = ref<[Dayjs, Dayjs] | null>(null)
const value7 = ref<[Dayjs, Dayjs] | null>(null)
const value8 = ref<[Dayjs, Dayjs] | null>(null)
const value9 = ref<[Dayjs, Dayjs] | null>(null)
</script>
