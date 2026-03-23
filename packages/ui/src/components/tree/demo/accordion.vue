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
        children: [{ key: '0-0-1-0', title: 'sss' }],
      },
    ],
  },
  {
    title: 'parent 2',
    key: '1-0',
    children: [
      { title: 'parent 2-0', key: '1-0-0' },
      { title: 'parent 2-1', key: '2-0-1' },
    ],
  },
]

const expandedKeys = ref<Key[]>([])
const selectedKeys = ref<Key[]>(['0-0-0', '0-0-1'])

function handleExpand(keys: Key[], info: { node: any; expanded: boolean }) {
  if (info.expanded) {
    // Find sibling keys and collapse them (accordion behavior)
    const parentChildren = (info.node.parent ? info.node.parent.children : treeData) || []
    const siblingKeys = parentChildren.map((n: TreeDataNode) => n.key)
    expandedKeys.value = keys.filter(k => !siblingKeys.includes(k)).concat(info.node.key)
  } else {
    expandedKeys.value = keys
  }
}
</script>

<template>
  <a-tree
    v-model:selected-keys="selectedKeys"
    :expanded-keys="expandedKeys"
    :tree-data="treeData"
    @expand="handleExpand"
  >
    <template #title="{ title, key }">
      <span v-if="key === '0-0-1-0'" style="color: #1677ff">{{ title }}</span>
      <template v-else>{{ title }}</template>
    </template>
  </a-tree>
</template>
