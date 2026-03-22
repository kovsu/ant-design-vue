<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ColumnsType, SorterResult, FilterValue } from '../types'

interface DataType {
  key: string
  name: string
  age: number
  address: string
}

const data: DataType[] = [
  { key: '1', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park' },
  { key: '2', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park' },
  { key: '3', name: 'Joe Black', age: 32, address: 'Sydney No. 1 Lake Park' },
  { key: '4', name: 'Jim Red', age: 32, address: 'London No. 2 Lake Park' },
]

const filteredInfo = ref<Record<string, FilterValue | null>>({})
const sortedInfo = ref<SorterResult<DataType>>({})

const columns = computed<ColumnsType<DataType>>(() => {
  const filtered = filteredInfo.value || {}
  const sorted = sortedInfo.value || {}
  return [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filters: [
        { text: 'Joe', value: 'Joe' },
        { text: 'Jim', value: 'Jim' },
      ],
      filteredValue: filtered.name || null,
      onFilter: (value, record) => record.name.includes(String(value)),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sorted.columnKey === 'name' ? sorted.order : null,
      ellipsis: true,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age,
      sortOrder: sorted.columnKey === 'age' ? sorted.order : null,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      filters: [
        { text: 'London', value: 'London' },
        { text: 'New York', value: 'New York' },
      ],
      filteredValue: filtered.address || null,
      onFilter: (value, record) => record.address.includes(String(value)),
      sorter: (a, b) => a.address.length - b.address.length,
      sortOrder: sorted.columnKey === 'address' ? sorted.order : null,
      ellipsis: true,
    },
  ]
})

function handleChange(
  _pagination: any,
  filters: Record<string, FilterValue | null>,
  sorter: SorterResult<DataType>,
) {
  filteredInfo.value = filters
  sortedInfo.value = sorter
}

function setAgeSort() {
  sortedInfo.value = { order: 'descend', columnKey: 'age' }
}

function clearFilters() {
  filteredInfo.value = {}
}

function clearAll() {
  filteredInfo.value = {}
  sortedInfo.value = {}
}
</script>

<template>
  <div>
    <div style="margin-bottom: 16px">
      <a-button @click="setAgeSort" style="margin-right: 8px">Sort age</a-button>
      <a-button @click="clearFilters" style="margin-right: 8px">Clear filters</a-button>
      <a-button @click="clearAll">Clear filters and sorters</a-button>
    </div>
    <a-table :columns="columns" :data-source="data" @change="handleChange" />
  </div>
</template>
