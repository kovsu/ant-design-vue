<script setup lang="ts">
import { ref } from 'vue'
import type { TreeDataNode, Key } from '../types'

const treeData: TreeDataNode[] = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        children: [
          { title: 'leaf', key: '0-0-0-0' },
          { title: 'leaf', key: '0-0-0-1' },
          { title: 'leaf', key: '0-0-0-2' },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [
          { title: 'leaf', key: '0-0-1-0' },
        ],
      },
      {
        title: 'parent 1-2',
        key: '0-0-2',
        children: [
          { title: 'leaf', key: '0-0-2-0' },
          { title: 'leaf', key: '0-0-2-1' },
        ],
      },
    ],
  },
]

const showLeafIcon = ref(false)
</script>

<template>
  <div>
    <div style="margin-bottom: 8px">
      <a-checkbox v-model:checked="showLeafIcon">showLeafIcon</a-checkbox>
    </div>
    <a-tree
      :tree-data="treeData"
      :show-line="showLeafIcon ? { showLeafIcon: true } : true"
      default-expand-all
    />
  </div>
</template>
