<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px">
    <h4>Popup Placement</h4>
    <a-radio-group v-model:value="placement">
      <a-radio-button value="topLeft">topLeft</a-radio-button>
      <a-radio-button value="topRight">topRight</a-radio-button>
      <a-radio-button value="bottomLeft">bottomLeft</a-radio-button>
      <a-radio-button value="bottomRight">bottomRight</a-radio-button>
    </a-radio-group>
    <a-tree-select
      v-model:value="value"
      show-search
      :dropdown-style="{ maxHeight: '400px', overflow: 'auto', minWidth: '300px' }"
      placeholder="Please select"
      allow-clear
      tree-default-expand-all
      :tree-data="treeData"
      :placement="placement"
      :dropdown-match-select-width="false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type Placement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'

const placement = ref<Placement>('topLeft')
const value = ref<string | undefined>(undefined)

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
