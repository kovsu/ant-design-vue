<script setup lang="ts">
import { h } from 'vue'
import type { ColumnsType } from '../types'
import TableSummary from '../Summary.vue'
import SummaryRow from '../SummaryRow.vue'
import SummaryCell from '../SummaryCell.vue'

interface DataType {
  key: string
  name: string
  borrow: number
  repayment: number
}

const columns: ColumnsType<DataType> = [
  { title: 'Name', dataIndex: 'name' },
  { title: 'Borrow', dataIndex: 'borrow' },
  { title: 'Repayment', dataIndex: 'repayment' },
]

const data: DataType[] = [
  { key: '1', name: 'John Brown', borrow: 10, repayment: 33 },
  { key: '2', name: 'Jim Green', borrow: 100, repayment: 0 },
  { key: '3', name: 'Joe Black', borrow: 10, repayment: 10 },
  { key: '4', name: 'Jim Red', borrow: 75, repayment: 45 },
]

const totalBorrow = data.reduce((sum, r) => sum + r.borrow, 0)
const totalRepayment = data.reduce((sum, r) => sum + r.repayment, 0)
</script>

<template>
  <a-table :columns="columns" :data-source="data" :pagination="false" bordered>
    <template #summary>
      <a-table-summary-row>
        <a-table-summary-cell :index="0">Total</a-table-summary-cell>
        <a-table-summary-cell :index="1">
          <span style="color: red;">{{ totalBorrow }}</span>
        </a-table-summary-cell>
        <a-table-summary-cell :index="2">
          <span>{{ totalRepayment }}</span>
        </a-table-summary-cell>
      </a-table-summary-row>
      <a-table-summary-row>
        <a-table-summary-cell :index="0">Balance</a-table-summary-cell>
        <a-table-summary-cell :index="1" :col-span="2">
          <span :style="{ color: totalBorrow > totalRepayment ? 'red' : 'green' }">
            {{ totalBorrow - totalRepayment }}
          </span>
        </a-table-summary-cell>
      </a-table-summary-row>
    </template>
  </a-table>
</template>
