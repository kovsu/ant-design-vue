<script setup lang="ts">
import type { ColumnsType } from '../types'

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
  { key: '4', name: 'Ben Kang', age: 15, address: 'Sydney No. 1 Lake Park' },
]
</script>

<template>
  <a-table
    class="ant-table-striped"
    size="middle"
    :columns="columns"
    :data-source="data"
    :row-class-name="(_record: DataType, index: number) => (index % 2 === 1 ? 'table-striped' : '')"
  />
  <a-table
    class="ant-table-striped"
    size="middle"
    :columns="columns"
    :data-source="data"
    :row-class-name="(_record: DataType, index: number) => (index % 2 === 1 ? 'table-striped' : '')"
    bordered
    style="margin-top: 16px"
  />
</template>

<style scoped>
.ant-table-striped :deep(.table-striped) td {
  background-color: #fafafa;
}
</style>
