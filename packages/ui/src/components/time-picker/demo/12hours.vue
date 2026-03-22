<script setup lang="ts">
import { ref } from 'vue'
import type { Dayjs } from 'dayjs'

const value = ref<Dayjs | null>(null)
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px; max-width: 200px">
    <a-time-picker v-model:value="value" use12-hours />
    <a-time-picker v-model:value="value" use12-hours format="h:mm:ss A" />
    <a-time-picker v-model:value="value" use12-hours format="h:mm a" />
  </div>
</template>
