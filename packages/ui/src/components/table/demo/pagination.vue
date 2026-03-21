<script setup lang="ts">
import type { ColumnsType } from '../types'

const columns: ColumnsType = [
  { title: 'Name', dataIndex: 'name' },
  { title: 'Age', dataIndex: 'age' },
  { title: 'Address', dataIndex: 'address' },
]

const data = Array.from({ length: 46 }, (_, i) => ({
  key: String(i),
  name: `Edward King ${i}`,
  age: 32,
  address: `London, Park Lane no. ${i}`,
}))
</script>

<template>
  <a-table
    :columns="columns"
    :data-source="data"
    :pagination="{ pageSize: 10, showSizeChanger: true, showQuickJumper: true }"
  />
</template>
