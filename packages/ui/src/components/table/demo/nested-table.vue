<script setup lang="ts">
import type { ColumnsType } from '../types'

interface DataType {
  key: number
  name: string
  platform: string
  version: string
  upgradeNum: number
  creator: string
  createdAt: string
}

interface InnerDataType {
  key: number
  date: string
  name: string
  upgradeNum: string
}

const columns: ColumnsType<DataType> = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Platform', dataIndex: 'platform', key: 'platform' },
  { title: 'Version', dataIndex: 'version', key: 'version' },
  { title: 'Upgraded', dataIndex: 'upgradeNum', key: 'upgradeNum' },
  { title: 'Creator', dataIndex: 'creator', key: 'creator' },
  { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
  { title: 'Action', key: 'operation' },
]

const innerColumns: ColumnsType<InnerDataType> = [
  { title: 'Date', dataIndex: 'date', key: 'date' },
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Status', key: 'state' },
  { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
  { title: 'Action', dataIndex: 'operation', key: 'operation' },
]

const data: DataType[] = Array.from({ length: 3 }, (_, i) => ({
  key: i,
  name: `Screen ${i + 1}`,
  platform: 'iOS',
  version: '10.3.4.5654',
  upgradeNum: 500,
  creator: 'Jack',
  createdAt: '2014-12-24 23:12:00',
}))

const innerData: InnerDataType[] = Array.from({ length: 3 }, (_, i) => ({
  key: i,
  date: '2014-12-24 23:12:00',
  name: `This is production name ${i + 1}`,
  upgradeNum: 'Upgraded: 56',
}))
</script>

<template>
  <a-table :columns="columns" :data-source="data">
    <template #bodyCell="{ column }">
      <template v-if="column.key === 'operation'">
        <a>Publish</a>
      </template>
    </template>
    <template #expandedRowRender>
      <a-table :columns="innerColumns" :data-source="innerData" :pagination="false">
        <template #bodyCell="{ column }">
          <template v-if="column.key === 'state'">
            <a-badge status="success" />
            Finished
          </template>
          <template v-else-if="column.key === 'operation'">
            <a>Pause</a>
            <a-divider type="vertical" />
            <a>Stop</a>
          </template>
        </template>
      </a-table>
    </template>
  </a-table>
</template>
