<template>
  <div style="max-width: 300px">
    <h4>Change on Select</h4>
    <p style="margin-bottom: 8px; color: #666">Allows selecting parent-level options</p>
    <a-cascader
      v-model:value="value"
      :options="options"
      placeholder="Please select"
      change-on-select
    />
    <p style="margin-top: 8px">Selected: {{ value }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<(string | number)[]>([])

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          { value: 'xihu', label: 'West Lake' },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          { value: 'zhonghuamen', label: 'Zhong Hua Men' },
        ],
      },
    ],
  },
]
</script>
