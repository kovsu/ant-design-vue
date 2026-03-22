<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { ColumnsType } from '../types'

interface DataType {
  key: string
  name: string
  age: number
  address: string
}

const columns: ColumnsType<DataType> = [
  { title: 'Name', dataIndex: 'name', width: '25%' },
  { title: 'Age', dataIndex: 'age', width: '15%' },
  { title: 'Address', dataIndex: 'address', width: '40%' },
  { title: 'Operation', dataIndex: 'operation' },
]

const data: DataType[] = Array.from({ length: 10 }, (_, i) => ({
  key: String(i),
  name: `Edward ${i}`,
  age: 32,
  address: `London Park no. ${i}`,
}))

const dataSource = ref(data)
const editableData = reactive<Record<string, DataType>>({})

function edit(key: string) {
  const record = dataSource.value.find(item => item.key === key)
  if (record) {
    editableData[key] = { ...record }
  }
}

function save(key: string) {
  const record = dataSource.value.find(item => item.key === key)
  if (record && editableData[key]) {
    Object.assign(record, editableData[key])
    delete editableData[key]
  }
}

function cancel(key: string) {
  delete editableData[key]
}
</script>

<template>
  <a-table :columns="columns" :data-source="dataSource" bordered>
    <template #bodyCell="{ column, text, record }">
      <template v-if="['name', 'age', 'address'].includes(column.dataIndex as string)">
        <div>
          <a-input
            v-if="editableData[record.key]"
            v-model:value="editableData[record.key][column.dataIndex as keyof DataType]"
            style="margin: -5px 0;"
          />
          <template v-else>{{ text }}</template>
        </div>
      </template>
      <template v-else-if="column.dataIndex === 'operation'">
        <span v-if="editableData[record.key]">
          <a style="margin-right: 8px;" @click="save(record.key)">Save</a>
          <a-popconfirm title="Sure to cancel?" @confirm="cancel(record.key)">
            <a>Cancel</a>
          </a-popconfirm>
        </span>
        <span v-else>
          <a @click="edit(record.key)">Edit</a>
        </span>
      </template>
    </template>
  </a-table>
</template>
