<script setup lang="ts">
import type { ColumnsType } from '../types'

interface DataType {
  key: number
  name: string
  age: number
  address: string
  description: string
}

const columns: ColumnsType<DataType> = [
  { title: 'Name', dataIndex: 'name' },
  { title: 'Age', dataIndex: 'age' },
  { title: 'Address', dataIndex: 'address' },
]

const data: DataType[] = Array.from({ length: 3 }, (_, i) => ({
  key: i,
  name: `Edward King ${i}`,
  age: 32,
  address: `London, Park Lane no. ${i}`,
  description: `My name is Edward King ${i}, I am 32 years old, living in London, Park Lane no. ${i}.`,
}))
</script>

<template>
  <a-table :columns="columns" :data-source="data">
    <template #expandedRowRender="{ record }">
      <p style="margin: 0;">{{ record.description }}</p>
    </template>
    <template #expandColumnTitle>
      <span style="color: red;">More</span>
    </template>
  </a-table>
</template>
