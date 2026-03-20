<script setup lang="ts">
import { ref } from 'vue'
import type { TreeDataNode, EventDataNode, Key } from '../types'

const treeData = ref<TreeDataNode[]>([
  { title: 'Expand to load', key: '0' },
  { title: 'Expand to load', key: '1' },
  { title: 'Tree Node (no load)', key: '2', isLeaf: true },
])

function onLoadData(node: EventDataNode): Promise<void> {
  return new Promise((resolve) => {
    if (node.children && node.children.length > 0) {
      resolve()
      return
    }
    setTimeout(() => {
      // Mutate treeData to add children
      const data = [...treeData.value]
      function addChildren(nodes: TreeDataNode[], key: Key) {
        for (const n of nodes) {
          if (n.key === key) {
            n.children = [
              { title: `Child of ${n.title}`, key: `${key}-0` },
              { title: `Child of ${n.title}`, key: `${key}-1` },
            ]
            return
          }
          if (n.children) addChildren(n.children, key)
        }
      }
      addChildren(data, node.key)
      treeData.value = data
      resolve()
    }, 1000)
  })
}
</script>

<template>
  <a-tree
    :tree-data="treeData"
    :load-data="onLoadData"
  />
</template>
