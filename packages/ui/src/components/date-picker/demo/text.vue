<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px">
    <a-date-picker v-model:value="dateValue" placeholder="Select date" @ok="onOk">
      <span>{{ dateValue ? dateValue.format('YYYY-MM-DD') : 'Select a date' }}</span>
    </a-date-picker>

    <a-range-picker v-model:value="rangeValue">
      <span>
        {{
          rangeValue
            ? `${rangeValue[0]?.format('YYYY-MM-DD')} ~ ${rangeValue[1]?.format('YYYY-MM-DD')}`
            : 'Select date range'
        }}
      </span>
    </a-range-picker>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Dayjs } from 'dayjs'

const dateValue = ref<Dayjs | null>(null)
const rangeValue = ref<[Dayjs, Dayjs] | null>(null)

function onOk(value: Dayjs | null) {
  console.log('onOk:', value)
}
</script>
