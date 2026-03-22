<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px">
    <h4>Large</h4>
    <a-cascader
      v-model:value="value"
      :options="options"
      placeholder="Large size"
      size="large"
    />

    <h4>Default</h4>
    <a-cascader
      v-model:value="value"
      :options="options"
      placeholder="Default size"
    />

    <h4>Small</h4>
    <a-cascader
      v-model:value="value"
      :options="options"
      placeholder="Small size"
      size="small"
    />
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
