<script setup lang="ts">
import type { ColumnsType } from '../types'

const columns: ColumnsType = [
  { title: 'Name', dataIndex: 'name' },
  { title: 'Age', dataIndex: 'age' },
  { title: 'Address', dataIndex: 'address' },
]

const data = [
  { key: '1', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park' },
  { key: '2', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park' },
  { key: '3', name: 'Joe Black', age: 32, address: 'Sydney No. 1 Lake Park' },
]
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 24px;">
    <div>
      <h4>Large</h4>
      <a-table :columns="columns" :data-source="data" size="large" />
    </div>
    <div>
      <h4>Middle (default)</h4>
      <a-table :columns="columns" :data-source="data" size="middle" />
    </div>
    <div>
      <h4>Small</h4>
      <a-table :columns="columns" :data-source="data" size="small" />
    </div>
  </div>
</template>
