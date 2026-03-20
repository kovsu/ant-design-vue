<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px">
    <a-date-picker v-model:value="value1" format="YYYY/MM/DD" placeholder="YYYY/MM/DD" />
    <a-date-picker v-model:value="value2" format="DD-MM-YYYY" placeholder="DD-MM-YYYY" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Dayjs } from 'dayjs'

const value1 = ref<Dayjs | null>(null)
const value2 = ref<Dayjs | null>(null)
</script>
