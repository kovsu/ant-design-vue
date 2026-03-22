<script setup lang="ts">
import { ref } from 'vue'
import type { Dayjs } from 'dayjs'

const placement = ref<'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'>('topLeft')
const value1 = ref<Dayjs | null>(null)
const value2 = ref<[Dayjs, Dayjs] | null>(null)
</script>

<template>
  <div>
    <a-radio-group v-model:value="placement">
      <a-radio-button value="topLeft">topLeft</a-radio-button>
      <a-radio-button value="topRight">topRight</a-radio-button>
      <a-radio-button value="bottomLeft">bottomLeft</a-radio-button>
      <a-radio-button value="bottomRight">bottomRight</a-radio-button>
    </a-radio-group>
    <div style="margin-top: 16px; display: flex; flex-direction: column; gap: 12px; max-width: 300px">
      <a-time-picker v-model:value="value1" :placement="placement" />
      <a-time-range-picker v-model:value="value2" :placement="placement" />
    </div>
  </div>
</template>
