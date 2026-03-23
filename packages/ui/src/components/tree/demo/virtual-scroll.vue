<script setup lang="ts">
import { ref } from 'vue'
import type { TreeDataNode, Key } from '../types'

function generateData(path = '0', level = 3): TreeDataNode[] {
  const list: TreeDataNode[] = []
  for (let i = 0; i < 10; i++) {
    const key = `${path}-${i}`
    const node: TreeDataNode = {
      title: key,
      key,
    }
    if (level > 0) {
      node.children = generateData(key, level - 1)
    }
    list.push(node)
  }
  return list
}

const treeData = generateData()

const selectedKeys = ref<Key[]>([])
const checkedKeys = ref<Key[]>([])
</script>

<template>
  <a-tree
    v-model:selected-keys="selectedKeys"
    v-model:checked-keys="checkedKeys"
    default-expand-all
    checkable
    :height="233"
    :tree-data="treeData"
  >
    <template #title="{ title, key }">
      <span v-if="key === '0-0-1-0'" style="color: #1677ff">{{ title }}</span>
      <template v-else>{{ title }}</template>
    </template>
  </a-tree>
</template>
