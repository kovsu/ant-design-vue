<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 200px">
    <a-time-picker v-model:value="value" placeholder="Select time" />
    <p>Selected: {{ value ? value.format('HH:mm:ss') : 'None' }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Dayjs } from 'dayjs'

const value = ref<Dayjs | null>(null)
</script>
