<template>
  <div style="max-width: 300px">
    <h4>Search</h4>
    <a-cascader
      v-model:value="value"
      :options="options"
      :show-search="{ filter }"
      placeholder="Try searching"
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
          { value: 'xiasha', label: 'Xia Sha', disabled: true },
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

const filter = (inputValue: string, path: any[]) => {
  return path.some(
    option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
  )
}
</script>
