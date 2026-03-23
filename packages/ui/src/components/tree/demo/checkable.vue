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
        disabled: true,
        children: [
          { title: 'leaf', key: '0-0-0-0', disableCheckbox: true },
          { title: 'leaf', key: '0-0-0-1' },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [
          { title: 'sss', key: '0-0-1-0' },
        ],
      },
    ],
  },
]

const expandedKeys = ref<Key[]>(['0-0', '0-0-0', '0-0-1'])
const checkedKeys = ref<Key[]>(['0-0-0-0'])
const selectedKeys = ref<Key[]>([])

function onCheck(keys: Key[]) {
  checkedKeys.value = keys as Key[]
}
</script>

<template>
  <a-tree
    v-model:expanded-keys="expandedKeys"
    v-model:checked-keys="checkedKeys"
    v-model:selected-keys="selectedKeys"
    checkable
    :tree-data="treeData"
    @check="onCheck"
  />
</template>
