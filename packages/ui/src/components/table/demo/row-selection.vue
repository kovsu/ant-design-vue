<script setup lang="ts">
import { ref } from 'vue'
import type { ColumnsType, Key, TableRowSelection } from '../types'

interface DataType {
  key: string
  name: string
  age: number
  address: string
}

const columns: ColumnsType<DataType> = [
  { title: 'Name', dataIndex: 'name' },
  { title: 'Age', dataIndex: 'age' },
  { title: 'Address', dataIndex: 'address' },
]

const data: DataType[] = [
  { key: '1', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park' },
  { key: '2', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park' },
  { key: '3', name: 'Joe Black', age: 32, address: 'Sydney No. 1 Lake Park' },
  { key: '4', name: 'Disabled User', age: 99, address: 'Sydney No. 1 Lake Park' },
]

const selectedRowKeys = ref<Key[]>([])

const rowSelection: TableRowSelection<DataType> = {
  selectedRowKeys: selectedRowKeys.value,
  onChange: (keys: Key[], selectedRows: DataType[]) => {
    selectedRowKeys.value = keys
    console.log(`selectedRowKeys: ${keys}`, 'selectedRows:', selectedRows)
  },
  getCheckboxProps: (record: DataType) => ({
    disabled: record.name === 'Disabled User',
  }),
}
</script>

<template>
  <a-table
    :columns="columns"
    :data-source="data"
    :row-selection="rowSelection"
  >
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'name'">
        <a>{{ text }}</a>
      </template>
    </template>
  </a-table>
</template>
