<template>
  <div style="display: flex; gap: 16px; max-width: 500px">
    <a-cascader
      v-model:value="value1"
      :options="options"
      placeholder="Custom suffix icon"
    >
      <template #suffixIcon>
        <span style="color: #52c41a">^_^</span>
      </template>
    </a-cascader>

    <a-cascader
      v-model:value="value2"
      :options="options"
      placeholder="Text suffix"
    >
      <template #suffixIcon>
        <span style="font-size: 12px">ab</span>
      </template>
    </a-cascader>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref<(string | number)[]>([])
const value2 = ref<(string | number)[]>([])

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
