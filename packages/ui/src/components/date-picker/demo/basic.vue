<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px">
    <a-date-picker v-model:value="value" placeholder="Select date" />
    <p>Selected: {{ value ? value.format('YYYY-MM-DD') : 'None' }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Dayjs } from 'dayjs'

const value = ref<Dayjs | null>(null)
</script>
