<script setup lang="ts">
import type { TreeDataNode } from '../types'

function generateData(level: number, prefix: string = ''): TreeDataNode[] {
  if (level <= 0) return []
  return Array.from({ length: 10 }, (_, i) => ({
    title: `${prefix}Node ${i}`,
    key: `${prefix}${i}`,
    children: level > 1 ? generateData(level - 1, `${prefix}${i}-`) : undefined,
  }))
}

const treeData = generateData(3)
</script>

<template>
  <a-tree
    :tree-data="treeData"
    :height="300"
    default-expand-all
  />
</template>
