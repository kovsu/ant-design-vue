<script setup lang="ts">
import { ref } from 'vue'
import type { ColumnsType, ColumnType } from '../types'

interface DataType {
  key: string
  name: string
  age: number
  address: string
  tags: string[]
}

const columns = ref<ColumnsType<DataType>>([
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    resizable: true,
    width: 150,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    resizable: true,
    width: 100,
    minWidth: 100,
    maxWidth: 200,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
  },
  {
    title: 'Action',
    key: 'action',
  },
])

const data: DataType[] = [
  { key: '1', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park', tags: ['nice', 'developer'] },
  { key: '2', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park', tags: ['loser'] },
  { key: '3', name: 'Joe Black', age: 32, address: 'Sydney No. 1 Lake Park', tags: ['cool', 'teacher'] },
]

function handleResizeColumn(w: number, col: ColumnType<DataType>) {
  col.width = w
}
</script>

<template>
  <a-table :columns="columns" :data-source="data" @resize-column="handleResizeColumn">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <a>{{ record.name }}</a>
      </template>
      <template v-else-if="column.key === 'tags'">
        <span>
          <a-tag
            v-for="tag in record.tags"
            :key="tag"
            :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
          >
            {{ tag.toUpperCase() }}
          </a-tag>
        </span>
      </template>
      <template v-else-if="column.key === 'action'">
        <a>Invite {{ record.name }}</a>
        <a-divider type="vertical" />
        <a>Delete</a>
      </template>
    </template>
  </a-table>
</template>
