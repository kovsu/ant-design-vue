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
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [
          { title: 'leaf', key: '0-0-1-0' },
        ],
      },
    ],
  },
]

const expandedKeys = ref<Key[]>(['0-0', '0-0-0'])
const selectedKeys = ref<Key[]>([])

function onSelect(keys: Key[]) {
  selectedKeys.value = keys
}

function onExpand(keys: Key[]) {
  expandedKeys.value = keys
}
</script>

<template>
  <a-tree
    :tree-data="treeData"
    :expanded-keys="expandedKeys"
    :selected-keys="selectedKeys"
    @select="onSelect"
    @expand="onExpand"
  />
</template>
