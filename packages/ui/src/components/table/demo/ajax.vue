<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import type { ColumnsType, TablePaginationConfig, FilterValue, SorterResult } from '../types'

interface DataType {
  key: string
  name: string
  gender: string
  email: string
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    width: '20%',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    filters: [
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' },
    ],
    width: '20%',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
]

const loading = ref(false)
const dataSource = ref<DataType[]>([])
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 50,
})

function generateData(page: number, pageSize: number): DataType[] {
  const names = ['John Brown', 'Jim Green', 'Joe Black', 'Jane White', 'Jack Blue']
  const genders = ['male', 'female']
  return Array.from({ length: pageSize }, (_, i) => {
    const idx = (page - 1) * pageSize + i
    return {
      key: String(idx),
      name: names[idx % names.length],
      gender: genders[idx % 2],
      email: `user${idx}@example.com`,
    }
  })
}

function fetchData() {
  loading.value = true
  // Simulate async fetch
  setTimeout(() => {
    dataSource.value = generateData(pagination.current, pagination.pageSize)
    loading.value = false
  }, 500)
}

function handleTableChange(
  pag: TablePaginationConfig,
  filters: Record<string, FilterValue | null>,
  sorter: SorterResult<DataType> | SorterResult<DataType>[],
) {
  pagination.current = pag.current ?? 1
  pagination.pageSize = pag.pageSize ?? 10
  console.log('filters:', filters, 'sorter:', sorter)
  fetchData()
}

// Initial load
fetchData()
</script>

<template>
  <a-table
    :columns="columns"
    :data-source="dataSource"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange"
  />
</template>
