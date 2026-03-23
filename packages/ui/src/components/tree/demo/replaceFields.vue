<script setup lang="ts">
import { ref } from 'vue'
import type { FieldNames, Key } from '../types'

const expandedKeys = ref<Key[]>(['0-0-0', '0-0-1'])
const selectedKeys = ref<Key[]>(['0-0-0', '0-0-1'])
const checkedKeys = ref<Key[]>(['0-0-0', '0-0-1'])

const fieldNames: FieldNames = {
  children: 'child',
  title: 'name',
}

const treeData = ref([
  {
    name: 'parent 1',
    key: '0-0',
    child: [
      {
        name: 'parent 1-0',
        key: '0-0-0',
        disabled: true,
        child: [
          { name: 'leaf', key: '0-0-0-0', disableCheckbox: true },
          { name: 'leaf', key: '0-0-0-1' },
        ],
      },
      {
        name: 'parent 1-1',
        key: '0-0-1',
        child: [{ key: '0-0-1-0', name: 'leaf' }],
      },
    ],
  },
])
</script>

<template>
  <a-tree
    v-model:expanded-keys="expandedKeys"
    v-model:selected-keys="selectedKeys"
    v-model:checked-keys="checkedKeys"
    checkable
    :tree-data="treeData"
    :field-names="fieldNames"
  >
    <template #title="{ name, key }">
      <span v-if="key === '0-0-1'" style="color: #1677ff">{{ name }}</span>
      <template v-else>{{ name }}</template>
    </template>
  </a-tree>
</template>
