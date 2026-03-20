<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px">
    <h4>Basic Cascader</h4>
    <a-cascader
      v-model:value="value"
      :options="options"
      placeholder="Please select"
    />

    <h4>Hover to expand</h4>
    <a-cascader
      v-model:value="value2"
      :options="options"
      expand-trigger="hover"
      placeholder="Hover to expand"
    />

    <h4>Change on select</h4>
    <a-cascader
      v-model:value="value3"
      :options="options"
      change-on-select
      placeholder="Select any level"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<(string | number)[]>([])
const value2 = ref<(string | number)[]>([])
const value3 = ref<(string | number)[]>([])

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
          { value: 'lingyin', label: 'Lingyin Temple' },
        ],
      },
      {
        value: 'ningbo',
        label: 'Ningbo',
        children: [
          { value: 'tianyi', label: 'Tianyi Pavilion' },
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
          { value: 'zhonghuamen', label: 'Zhonghua Gate' },
        ],
      },
    ],
  },
]
</script>
