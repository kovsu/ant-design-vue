<template>
  <div style="max-width: 400px">
    <h4>Virtual Scroll ({{ totalNodes }} nodes)</h4>
    <a-tree-select
      v-model:value="checkedKeys"
      style="width: 100%"
      tree-checkable
      tree-default-expand-all
      show-checked-strategy="SHOW_PARENT"
      :list-height="233"
      :tree-data="treeData"
      :max-tag-count="10"
      placeholder="Select nodes"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface TreeNode {
  label: string
  value: string
  children?: TreeNode[]
}

function generateTree(path = '0', level = 3): TreeNode[] {
  const list: TreeNode[] = []
  for (let i = 0; i < 10; i++) {
    const value = `${path}-${i}`
    const node: TreeNode = {
      label: value,
      value,
    }
    if (level > 0) {
      node.children = generateTree(value, level - 1)
    }
    list.push(node)
  }
  return list
}

function countNodes(nodes: TreeNode[]): number {
  let count = 0
  for (const node of nodes) {
    count += 1
    if (node.children) count += countNodes(node.children)
  }
  return count
}

const treeData = ref(generateTree())
const totalNodes = computed(() => countNodes(treeData.value))
const checkedKeys = ref<string[]>(['0-0-0', '0-0-1'])
</script>
