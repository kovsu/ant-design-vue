<template>
  <div style="max-width: 400px">
    <h4>Custom Field Names</h4>
    <a-tree-select
      v-model:value="value"
      show-search
      style="width: 100%"
      :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
      placeholder="Please select"
      allow-clear
      tree-default-expand-all
      :tree-data="treeData"
      :field-names="{
        children: 'children',
        label: 'name',
        value: 'value',
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string | undefined>(undefined)

const treeData = [
  {
    name: 'parent 1',
    value: 'parent 1',
    children: [
      {
        name: 'parent 1-0',
        value: 'parent 1-0',
        children: [
          { name: 'my leaf', value: 'leaf1' },
          { name: 'your leaf', value: 'leaf2' },
        ],
      },
      { name: 'parent 1-1', value: 'parent 1-1' },
    ],
  },
]
</script>
