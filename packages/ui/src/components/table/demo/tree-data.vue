<script setup lang="ts">
import type { ColumnsType } from '../types'

interface DataType {
  key: number
  name: string
  age: number
  address: string
  children?: DataType[]
}

const columns: ColumnsType<DataType> = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age', width: '12%' },
  { title: 'Address', dataIndex: 'address', width: '30%', key: 'address' },
]

const data: DataType[] = [
  {
    key: 1,
    name: 'John Brown sr.',
    age: 60,
    address: 'New York No. 1 Lake Park',
    children: [
      {
        key: 11,
        name: 'John Brown',
        age: 42,
        address: 'New York No. 2 Lake Park',
      },
      {
        key: 12,
        name: 'John Brown jr.',
        age: 30,
        address: 'New York No. 3 Lake Park',
        children: [
          { key: 121, name: 'Jimmy Brown', age: 16, address: 'New York No. 3 Lake Park' },
        ],
      },
      {
        key: 13,
        name: 'Jim Green sr.',
        age: 72,
        address: 'London No. 1 Lake Park',
        children: [
          { key: 131, name: 'Jim Green', age: 42, address: 'London No. 2 Lake Park' },
          { key: 132, name: 'Jim Green jr.', age: 25, address: 'London No. 3 Lake Park' },
        ],
      },
    ],
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
  },
]
</script>

<template>
  <a-table :columns="columns" :data-source="data" :default-expand-all-rows="true" />
</template>
