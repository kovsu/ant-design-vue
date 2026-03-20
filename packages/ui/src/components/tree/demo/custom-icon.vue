<script setup lang="ts">
import type { TreeDataNode, Key, TreeNodeSlotProps } from '../types'

const treeData: TreeDataNode[] = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      { title: 'leaf 1-0', key: '0-0-0' },
      { title: 'leaf 1-1', key: '0-0-1' },
    ],
  },
  {
    title: 'parent 2',
    key: '0-1',
    children: [
      { title: 'leaf 2-0', key: '0-1-0' },
    ],
  },
]
</script>

<template>
  <a-tree
    :tree-data="treeData"
    show-icon
    default-expand-all
  >
    <template #icon="{ expanded, isLeaf }: TreeNodeSlotProps">
      <span v-if="isLeaf">🍃</span>
      <span v-else-if="expanded">🔽</span>
      <span v-else>▶️</span>
    </template>
    <template #title="{ title }: TreeNodeSlotProps">
      <span style="color: var(--color-accent)">{{ title }}</span>
    </template>
  </a-tree>
</template>
