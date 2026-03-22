<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px">
    <a-date-picker v-model:value="value1" placeholder="Custom date render">
      <template #dateRender="{ current }">
        <div class="ant-picker-cell-inner" :style="getCellStyle(current)">
          {{ current.date() }}
        </div>
      </template>
    </a-date-picker>

    <a-range-picker v-model:value="value2">
      <template #dateRender="{ current }">
        <div class="ant-picker-cell-inner" :style="getCellStyle(current)">
          {{ current.date() }}
        </div>
      </template>
    </a-range-picker>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { CSSProperties } from 'vue'
import type { Dayjs } from 'dayjs'

const value1 = ref<Dayjs | null>(null)
const value2 = ref<[Dayjs, Dayjs] | null>(null)

function getCellStyle(current: Dayjs): CSSProperties {
  const style: CSSProperties = {}
  if (current.date() === 1) {
    style.border = '1px solid #1677ff'
    style.borderRadius = '50%'
  }
  return style
}
</script>
