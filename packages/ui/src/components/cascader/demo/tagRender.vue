<template>
  <div style="max-width: 400px">
    <h4>Custom Tag Render</h4>
    <a-cascader
      v-model:value="value"
      multiple
      :options="options"
      placeholder="Please select"
    >
      <template #tagRender="{ label, closable, onClose }">
        <a-tag color="blue" :closable="closable" @close="onClose">
          {{ label }}
        </a-tag>
      </template>
    </a-cascader>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<(string | number)[][]>([])

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'frozen',
        label: 'Frozen',
        children: [
          { value: 'salmon', label: 'Salmon' },
          { value: 'beef', label: 'Beef' },
        ],
      },
      {
        value: 'fruits',
        label: 'Fruits',
        children: [
          { value: 'apple', label: 'Apple' },
          { value: 'banana', label: 'Banana' },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'pastry',
        label: 'Pastry',
        children: [
          { value: 'mooncake-egg', label: 'Egg Yolk Mooncake' },
          { value: 'mooncake-nut', label: 'Five Nut Mooncake' },
        ],
      },
    ],
  },
]
</script>
