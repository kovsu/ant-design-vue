<script setup lang="ts">
import { ref } from 'vue'
import type { TreeDataNode, Key } from '../types'

const treeData: TreeDataNode[] = [
  {
    title: 'parent 0',
    key: '0-0',
    children: [
      { title: 'leaf 0-0', key: '0-0-0', isLeaf: true },
      { title: 'leaf 0-1', key: '0-0-1', isLeaf: true },
    ],
  },
  {
    title: 'parent 1',
    key: '0-1',
    children: [
      { title: 'leaf 1-0', key: '0-1-0', isLeaf: true },
      { title: 'leaf 1-1', key: '0-1-1', isLeaf: true },
    ],
  },
]

const selectedKeys = ref<Key[]>([])
const expandedKeys = ref<Key[]>(['0-0'])

function onSelect(keys: Key[]) {
  selectedKeys.value = keys
}
</script>

<template>
  <a-directory-tree
    v-model:expanded-keys="expandedKeys"
    :tree-data="treeData"
    :selected-keys="selectedKeys"
    multiple
    @select="onSelect"
  />
</template>
