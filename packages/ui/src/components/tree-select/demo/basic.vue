<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px">
    <h4>Basic TreeSelect</h4>
    <a-tree-select
      v-model:value="value"
      :tree-data="treeData"
      placeholder="Please select"
      allow-clear
    />

    <h4>Multiple TreeSelect</h4>
    <a-tree-select
      v-model:value="multiValue"
      :tree-data="treeData"
      placeholder="Select multiple"
      multiple
      allow-clear
    />

    <h4>Checkable TreeSelect</h4>
    <a-tree-select
      v-model:value="checkValue"
      :tree-data="treeData"
      placeholder="Check nodes"
      tree-checkable
      allow-clear
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string | undefined>(undefined)
const multiValue = ref<string[]>([])
const checkValue = ref<string[]>([])

const treeData = [
  {
    value: 'parent-1',
    label: 'Parent 1',
    children: [
      {
        value: 'child-1-1',
        label: 'Child 1-1',
        children: [
          { value: 'leaf-1', label: 'Leaf 1' },
          { value: 'leaf-2', label: 'Leaf 2' },
        ],
      },
      { value: 'child-1-2', label: 'Child 1-2' },
    ],
  },
  {
    value: 'parent-2',
    label: 'Parent 2',
    children: [
      { value: 'child-2-1', label: 'Child 2-1' },
      { value: 'child-2-2', label: 'Child 2-2' },
    ],
  },
]
</script>
