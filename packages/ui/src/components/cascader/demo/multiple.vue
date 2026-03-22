<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px">
    <h4>Multiple Selection (SHOW_PARENT)</h4>
    <a-cascader
      v-model:value="value"
      style="width: 100%"
      multiple
      :options="options"
      placeholder="Please select"
      show-checked-strategy="SHOW_PARENT"
    />

    <h4>Multiple Selection (SHOW_CHILD)</h4>
    <a-cascader
      v-model:value="value2"
      style="width: 100%"
      multiple
      :options="options"
      placeholder="Please select"
      show-checked-strategy="SHOW_CHILD"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<(string | number)[][]>([])
const value2 = ref<(string | number)[][]>([])

const options = [
  {
    label: 'Light',
    value: 'light',
    children: Array.from({ length: 5 }, (_, i) => ({
      label: `Number ${i}`,
      value: i,
    })),
  },
  {
    label: 'Bamboo',
    value: 'bamboo',
    children: [
      {
        label: 'Little',
        value: 'little',
        children: [
          { label: 'Toy Fish', value: 'fish' },
          { label: 'Toy Cards', value: 'cards' },
          { label: 'Toy Bird', value: 'bird' },
        ],
      },
    ],
  },
]
</script>
