<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px">
    <a-date-picker
      v-model:value="value"
      :show-time="true"
      placeholder="Select date & time"
    />
    <p>Selected: {{ value ? value.format('YYYY-MM-DD HH:mm:ss') : 'None' }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Dayjs } from 'dayjs'

const value = ref<Dayjs | null>(null)
</script>
