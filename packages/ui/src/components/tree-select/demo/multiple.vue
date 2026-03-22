<template>
  <div style="max-width: 400px">
    <h4>Multiple Selection</h4>
    <a-tree-select
      v-model:value="value"
      show-search
      style="width: 100%"
      :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
      placeholder="Please select"
      allow-clear
      multiple
      tree-default-expand-all
      :tree-data="treeData"
    >
      <template #title="{ value: val, label }">
        <b v-if="val === 'parent 1-1'" style="color: #08c">{{ val }}</b>
        <template v-else>{{ label }}</template>
      </template>
    </a-tree-select>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string[]>([])

const treeData = [
  {
    label: 'parent 1',
    value: 'parent 1',
    children: [
      {
        label: 'parent 1-0',
        value: 'parent 1-0',
        children: [
          {
            label: 'parent 1-0-0',
            value: 'parent 1-0-0',
            children: [
              { label: 'my leaf', value: 'leaf1' },
              { label: 'your leaf', value: 'leaf2' },
            ],
          },
          { label: 'parent 1-0-1', value: 'parent 1-0-1' },
        ],
      },
      { label: 'parent 1-1', value: 'parent 1-1' },
    ],
  },
]
</script>
