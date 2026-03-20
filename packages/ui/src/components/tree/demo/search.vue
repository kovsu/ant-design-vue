<script setup lang="ts">
import { ref, computed } from 'vue'
import type { TreeDataNode, Key } from '../types'

const treeData: TreeDataNode[] = [
  {
    title: 'parent 0',
    key: '0-0',
    children: [
      { title: 'leaf 0-0', key: '0-0-0' },
      { title: 'leaf 0-1', key: '0-0-1' },
    ],
  },
  {
    title: 'parent 1',
    key: '0-1',
    children: [
      { title: 'leaf 1-0', key: '0-1-0' },
      { title: 'leaf 1-1', key: '0-1-1' },
    ],
  },
  {
    title: 'parent 2',
    key: '0-2',
    children: [
      { title: 'apple', key: '0-2-0' },
      { title: 'banana', key: '0-2-1' },
    ],
  },
]

const searchValue = ref('')
const expandedKeys = ref<Key[]>(['0-0', '0-1', '0-2'])

const filterFn = computed(() => {
  if (!searchValue.value) return undefined
  const search = searchValue.value.toLowerCase()
  return (node: TreeDataNode) => {
    return String(node.title ?? '').toLowerCase().includes(search)
  }
})
</script>

<template>
  <div>
    <a-input-search
      v-model:value="searchValue"
      placeholder="Search"
      style="margin-bottom: 8px"
    />
    <a-tree
      :tree-data="treeData"
      :expanded-keys="expandedKeys"
      :filter-tree-node="filterFn"
      default-expand-all
    />
  </div>
</template>
