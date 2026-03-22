<template>
  <div style="max-width: 300px">
    <h4>Custom Field Names</h4>
    <a-cascader
      v-model:value="value"
      :field-names="{ label: 'name', value: 'code', children: 'items' }"
      :options="options"
      placeholder="Please select"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<(string | number)[]>([])

const options = [
  {
    code: 'zhejiang',
    name: 'Zhejiang',
    items: [
      {
        code: 'hangzhou',
        name: 'Hangzhou',
        items: [
          { code: 'xihu', name: 'West Lake' },
        ],
      },
    ],
  },
  {
    code: 'jiangsu',
    name: 'Jiangsu',
    items: [
      {
        code: 'nanjing',
        name: 'Nanjing',
        items: [
          { code: 'zhonghuamen', name: 'Zhong Hua Men' },
        ],
      },
    ],
  },
]
</script>
