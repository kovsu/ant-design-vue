<script setup lang="ts">
import { ref } from 'vue'
import type { TreeDataNode, Key, EventDataNode } from '../types'

const expandedKeys = ref<Key[]>([])
const selectedKeys = ref<Key[]>([])
const treeData = ref<TreeDataNode[]>([
  { title: 'Expand to load', key: '0' },
  { title: 'Expand to load', key: '1' },
  { title: 'Tree Node', key: '2', isLeaf: true },
])

function onLoadData(node: EventDataNode): Promise<void> {
  return new Promise((resolve) => {
    if (node.children && node.children.length > 0) {
      resolve()
      return
    }
    setTimeout(() => {
      const key = node.key
      const newChildren: TreeDataNode[] = [
        { title: 'Child Node', key: `${key}-0` },
        { title: 'Child Node', key: `${key}-1` },
      ]
      // Find and update the node in tree data
      updateTreeData(treeData.value, key, newChildren)
      treeData.value = [...treeData.value]
      resolve()
    }, 1000)
  })
}

function updateTreeData(list: TreeDataNode[], key: Key, children: TreeDataNode[]) {
  for (const node of list) {
    if (node.key === key) {
      node.children = children
      return
    }
    if (node.children) {
      updateTreeData(node.children, key, children)
    }
  }
}
</script>

<template>
  <a-tree
    v-model:expandedKeys="expandedKeys"
    v-model:selectedKeys="selectedKeys"
    :load-data="onLoadData"
    :tree-data="treeData"
  />
</template>
