<template>
  <div style="max-width: 400px">
    <h4>Checkable TreeSelect</h4>
    <a-tree-select
      v-model:value="value"
      style="width: 100%"
      :tree-data="treeData"
      tree-checkable
      allow-clear
      show-checked-strategy="SHOW_PARENT"
      placeholder="Please select"
    />
    <p style="margin-top: 8px">Selected: {{ value }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string[]>(['0-0-0'])

const treeData = [
  {
    label: 'Node1',
    value: '0-0',
    children: [
      { label: 'Child Node1', value: '0-0-0' },
    ],
  },
  {
    label: 'Node2',
    value: '0-1',
    children: [
      { label: 'Child Node3', value: '0-1-0', disabled: true },
      { label: 'Child Node4', value: '0-1-1' },
      { label: 'Child Node5', value: '0-1-2' },
    ],
  },
]
</script>
