<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px">
    <h4>Custom Suffix Icon (Single)</h4>
    <a-tree-select
      v-model:value="value"
      show-search
      style="width: 100%"
      :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
      placeholder="Please select"
      allow-clear
      tree-default-expand-all
      :tree-data="treeData"
    >
      <template #suffixIcon>
        <span style="color: #52c41a">^_^</span>
      </template>
    </a-tree-select>

    <h4>Custom Suffix Icon (Multiple)</h4>
    <a-tree-select
      v-model:value="multiValue"
      show-search
      style="width: 100%"
      :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
      placeholder="Please select"
      allow-clear
      multiple
      show-arrow
      tree-default-expand-all
      :tree-data="treeData"
    >
      <template #suffixIcon>
        <span style="color: #52c41a">^_^</span>
      </template>
    </a-tree-select>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string | undefined>(undefined)
const multiValue = ref<string[]>([])

const treeData = [
  {
    label: 'parent 1',
    value: 'parent 1',
    children: [
      {
        label: 'parent 1-0',
        value: 'parent 1-0',
        children: [
          { label: 'my leaf', value: 'leaf1' },
          { label: 'your leaf', value: 'leaf2' },
        ],
      },
      { label: 'parent 1-1', value: 'parent 1-1' },
    ],
  },
]
</script>
