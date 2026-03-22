<template>
  <div style="max-width: 300px">
    <h4>Lazy Loading</h4>
    <a-cascader
      v-model:value="value"
      :options="options"
      :load-data="loadData"
      placeholder="Please select"
      change-on-select
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Option {
  value: string
  label: string
  isLeaf?: boolean
  loading?: boolean
  children?: Option[]
}

const value = ref<(string | number)[]>([])

const options = ref<Option[]>([
  { value: 'zhejiang', label: 'Zhejiang', isLeaf: false },
  { value: 'jiangsu', label: 'Jiangsu', isLeaf: false },
])

const loadData = (selectedOptions: any[]) => {
  const targetOption = selectedOptions[selectedOptions.length - 1]
  targetOption.loading = true

  // Simulate async loading
  setTimeout(() => {
    targetOption.loading = false
    targetOption.children = [
      {
        label: `${targetOption.label} Dynamic 1`,
        value: 'dynamic1',
      },
      {
        label: `${targetOption.label} Dynamic 2`,
        value: 'dynamic2',
      },
    ]
    options.value = [...options.value]
  }, 1000)
}
</script>
