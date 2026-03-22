<template>
  <div style="display: flex; flex-direction: column; gap: 16px">
    <a-radio-group v-model:value="placement">
      <a-radio-button value="topLeft">topLeft</a-radio-button>
      <a-radio-button value="topRight">topRight</a-radio-button>
      <a-radio-button value="bottomLeft">bottomLeft</a-radio-button>
      <a-radio-button value="bottomRight">bottomRight</a-radio-button>
    </a-radio-group>

    <a-date-picker v-model:value="value1" :placement="placement" placeholder="Select date" />
    <a-range-picker v-model:value="value2" :placement="placement" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Dayjs } from 'dayjs'
import type { DatePickerPlacement } from '../types'

const placement = ref<DatePickerPlacement>('topLeft')
const value1 = ref<Dayjs | null>(null)
const value2 = ref<[Dayjs, Dayjs] | null>(null)
</script>
