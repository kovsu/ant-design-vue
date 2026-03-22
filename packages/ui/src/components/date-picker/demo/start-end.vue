<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px">
    <a-date-picker
      v-model:value="startValue"
      :disabled-date="disabledStartDate"
      show-time
      format="YYYY-MM-DD HH:mm:ss"
      placeholder="Start"
      @openChange="handleStartOpenChange"
    />
    <a-date-picker
      v-model:value="endValue"
      :disabled-date="disabledEndDate"
      show-time
      format="YYYY-MM-DD HH:mm:ss"
      placeholder="End"
      :open="endOpen"
      @openChange="handleEndOpenChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Dayjs } from 'dayjs'

const startValue = ref<Dayjs | null>(null)
const endValue = ref<Dayjs | null>(null)
const endOpen = ref(false)

function disabledStartDate(current: Dayjs): boolean {
  if (!current || !endValue.value) {
    return false
  }
  return current.valueOf() > endValue.value.valueOf()
}

function disabledEndDate(current: Dayjs): boolean {
  if (!current || !startValue.value) {
    return false
  }
  return startValue.value.valueOf() >= current.valueOf()
}

function handleStartOpenChange(open: boolean) {
  if (!open) {
    endOpen.value = true
  }
}

function handleEndOpenChange(open: boolean) {
  endOpen.value = open
}
</script>
