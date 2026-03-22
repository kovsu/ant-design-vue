<template>
  <div style="max-width: 400px">
    <h4>Custom Display Render</h4>
    <a-cascader
      v-model:value="value"
      :options="options"
      placeholder="Please select"
      style="width: 100%"
    >
      <template #displayRender="{ labels, selectedOptions }">
        <span v-for="(label, index) in labels" :key="index">
          <span v-if="index === labels.length - 1">
            {{ label }} (
            <a
              style="color: #1677ff"
              @click.stop="handleAreaClick(label, selectedOptions[index])"
            >
              {{ (selectedOptions[index] as any).code }}
            </a>
            )
          </span>
          <span v-else>{{ label }} / </span>
        </span>
      </template>
    </a-cascader>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<(string | number)[]>(['zhejiang', 'hangzhou', 'xihu'])

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          { value: 'xihu', label: 'West Lake', code: 752100 },
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
          { value: 'zhonghuamen', label: 'Zhong Hua Men', code: 453400 },
        ],
      },
    ],
  },
]

const handleAreaClick = (label: string, option: any) => {
  console.log('clicked', label, option)
}
</script>
