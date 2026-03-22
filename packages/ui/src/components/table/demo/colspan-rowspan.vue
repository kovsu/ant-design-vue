<script setup lang="ts">
import type { ColumnsType } from '../types'

interface DataType {
  key: string
  name: string
  age: number
  tel: string
  phone: number
  address: string
}

// In the fifth row, other columns are merged into the first column
// by setting their colSpan to 0
const sharedOnCell = (_: DataType, index: number) => {
  if (index === 4) {
    return { colSpan: 0 }
  }
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    customCell: (_, index) => ({
      colSpan: (index ?? 0) < 4 ? 1 : 5,
    }),
  },
  {
    title: 'Age',
    dataIndex: 'age',
    customCell: sharedOnCell,
  },
  {
    title: 'Home phone',
    colSpan: 2,
    dataIndex: 'tel',
    customCell: (_, index) => {
      if (index === 2) {
        return { rowSpan: 2 }
      }
      if (index === 3) {
        return { rowSpan: 0 }
      }
      if (index === 4) {
        return { colSpan: 0 }
      }
    },
  },
  {
    title: 'Phone',
    colSpan: 0,
    dataIndex: 'phone',
    customCell: sharedOnCell,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    customCell: sharedOnCell,
  },
]

const data: DataType[] = [
  { key: '1', name: 'John Brown', age: 32, tel: '0571-22098909', phone: 18889898989, address: 'New York No. 1 Lake Park' },
  { key: '2', name: 'Jim Green', age: 42, tel: '0571-22098333', phone: 18889898888, address: 'London No. 1 Lake Park' },
  { key: '3', name: 'Joe Black', age: 32, tel: '0575-22098909', phone: 18900010002, address: 'Sydney No. 1 Lake Park' },
  { key: '4', name: 'Jim Red', age: 18, tel: '0575-22098909', phone: 18900010002, address: 'London No. 2 Lake Park' },
  { key: '5', name: 'Jake White', age: 18, tel: '0575-22098909', phone: 18900010002, address: 'Dublin No. 2 Lake Park' },
]
</script>

<template>
  <a-table :columns="columns" :data-source="data" bordered>
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'name'">
        <a href="javascript:;">{{ text }}</a>
      </template>
    </template>
  </a-table>
</template>
