<script setup lang="ts">
import type { ColumnsType } from '../types'

const columns: ColumnsType = [
  { title: 'Name', dataIndex: 'name' },
  { title: 'Cash Assets', className: 'column-money', dataIndex: 'money', align: 'right' },
  { title: 'Address', dataIndex: 'address' },
]

const dataSource = [
  { key: '1', name: 'John Brown', money: '￥300,000.00', address: 'New York No. 1 Lake Park' },
  { key: '2', name: 'Jim Green', money: '￥1,256,000.00', address: 'London No. 1 Lake Park' },
  { key: '3', name: 'Joe Black', money: '￥120,000.00', address: 'Sydney No. 1 Lake Park' },
]
</script>

<template>
  <a-table :columns="columns" :data-source="dataSource" bordered>
    <template #title>Header</template>
    <template #footer>Footer</template>
  </a-table>
</template>
