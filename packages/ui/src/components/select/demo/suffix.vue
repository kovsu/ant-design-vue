<template>
  <div style="display: flex; gap: 16px; max-width: 400px">
    <a-select
      v-model:value="value1"
      style="width: 150px"
      :options="options"
    >
      <template #suffixIcon>
        <span style="color: #52c41a">^_^</span>
      </template>
    </a-select>

    <a-select
      v-model:value="value2"
      style="width: 150px"
      :options="options"
      disabled
    >
      <template #suffixIcon>
        <span style="color: #999">-_-</span>
      </template>
    </a-select>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref('lucy')
const value2 = ref('lucy')

const options = [
  { value: 'jack', label: 'Jack' },
  { value: 'lucy', label: 'Lucy' },
  { value: 'disabled', label: 'Disabled', disabled: true },
  { value: 'yiminghe', label: 'Yiminghe' },
]
</script>
