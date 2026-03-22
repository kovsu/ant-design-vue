<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Key, TableRowSelection } from '../types'
import { SELECTION_ALL, SELECTION_INVERT, SELECTION_NONE } from '../types'

interface DataType {
  key: Key
  name: string
  age: number
  address: string
}

const columns = [
  { title: 'Name', dataIndex: 'name' },
  { title: 'Age', dataIndex: 'age' },
  { title: 'Address', dataIndex: 'address' },
]

const data: DataType[] = Array.from({ length: 46 }, (_, i) => ({
  key: i,
  name: `Edward King ${i}`,
  age: 32,
  address: `London, Park Lane no. ${i}`,
}))

const selectedRowKeys = ref<Key[]>([])

function onSelectChange(keys: Key[]) {
  selectedRowKeys.value = keys
}

const rowSelection = computed<TableRowSelection<DataType>>(() => ({
  selectedRowKeys: selectedRowKeys.value,
  onChange: onSelectChange,
  selections: [
    SELECTION_ALL,
    SELECTION_INVERT,
    SELECTION_NONE,
    {
      key: 'odd',
      text: 'Select Odd Row',
      onSelect: (changeableRowKeys: Key[]) => {
        selectedRowKeys.value = changeableRowKeys.filter((_key, index) => index % 2 === 0)
      },
    },
    {
      key: 'even',
      text: 'Select Even Row',
      onSelect: (changeableRowKeys: Key[]) => {
        selectedRowKeys.value = changeableRowKeys.filter((_key, index) => index % 2 !== 0)
      },
    },
  ],
}))
</script>

<template>
  <a-table
    :columns="columns"
    :data-source="data"
    :row-selection="rowSelection"
  />
</template>
