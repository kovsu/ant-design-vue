<script setup lang="ts">
import { ref } from 'vue'
import type { TreeDataNode, Key } from '../types'

const treeData: TreeDataNode[] = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      { title: 'leaf', key: '0-0-0' },
      { title: 'leaf', key: '0-0-1' },
    ],
  },
]

const selectedKeys = ref<Key[]>(['0-0-0'])
</script>

<template>
  <a-tree
    v-model:selectedKeys="selectedKeys"
    :tree-data="treeData"
    show-icon
    default-expand-all
  >
    <template #icon="{ key, selected }">
      <template v-if="key === '0-0' || key === '0-0-0'">
        <span>&#9786;</span>
      </template>
      <template v-else>
        <span v-if="selected">&#9785;</span>
        <span v-else>&#9788;</span>
      </template>
    </template>
  </a-tree>
</template>
