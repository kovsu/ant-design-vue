<script setup lang="ts">
import type { ColumnsType } from '../types'

interface DataType {
  key: number
  name: string
  age: number
  address: string
}

const columns: ColumnsType<DataType> = [
  { title: 'Name', dataIndex: 'name', width: 150 },
  { title: 'Age', dataIndex: 'age', width: 100 },
  { title: 'Address', dataIndex: 'address' },
]

const data: DataType[] = Array.from({ length: 10000 }, (_, i) => ({
  key: i,
  name: `User ${i}`,
  age: 20 + (i % 50),
  address: `Street ${i}, City ${i % 100}`,
}))
</script>

<template>
  <a-table
    :columns="columns"
    :data-source="data"
    :pagination="false"
    :scroll="{ y: 400 }"
  />
</template>
