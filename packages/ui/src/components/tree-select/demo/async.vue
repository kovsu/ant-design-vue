<template>
  <div style="max-width: 400px">
    <h4>Async Loading</h4>
    <a-tree-select
      v-model:value="value"
      style="width: 100%"
      :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
      :tree-data="treeData"
      placeholder="Please select"
      :load-data="onLoadData"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface TreeNode {
  value: string
  label: string
  isLeaf?: boolean
  children?: TreeNode[]
}

const value = ref<string | undefined>(undefined)

const treeData = ref<TreeNode[]>([
  { value: '1', label: 'Expand to load' },
  { value: '2', label: 'Expand to load' },
  { value: '3', label: 'Tree Node', isLeaf: true },
])

const onLoadData = (node: any): Promise<void> => {
  return new Promise((resolve) => {
    if (node.children) {
      resolve()
      return
    }
    setTimeout(() => {
      const id = node.value
      const children: TreeNode[] = [
        { value: `${id}-1`, label: 'Expand to load' },
        { value: `${id}-2`, label: 'Tree Node', isLeaf: true },
        { value: `${id}-3`, label: 'Tree Node', isLeaf: true },
      ]
      // Find and update the node
      const updateNode = (nodes: TreeNode[]): boolean => {
        for (const n of nodes) {
          if (n.value === id) {
            n.children = children
            return true
          }
          if (n.children && updateNode(n.children)) return true
        }
        return false
      }
      updateNode(treeData.value)
      treeData.value = [...treeData.value]
      resolve()
    }, 300)
  })
}
</script>
