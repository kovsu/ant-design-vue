<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px">
    <a-date-picker disabled placeholder="Disabled" />
    <a-date-picker :disabled-date="disabledDate" placeholder="Disabled weekends" />
  </div>
</template>

<script setup lang="ts">
import type { Dayjs } from 'dayjs'

const disabledDate = (current: Dayjs) => {
  // Disable weekends (Saturday = 6, Sunday = 0)
  return current.day() === 0 || current.day() === 6
}
</script>
