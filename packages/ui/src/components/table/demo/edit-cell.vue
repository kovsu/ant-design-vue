<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import type { ColumnsType } from '../types'

interface DataType {
  key: string
  name: string
  age: number
  address: string
}

const columns: ColumnsType<DataType> = [
  { title: 'Name', dataIndex: 'name', width: '30%' },
  { title: 'Age', dataIndex: 'age' },
  { title: 'Address', dataIndex: 'address' },
  { title: 'Operation', dataIndex: 'operation' },
]

const dataSource = ref<DataType[]>([
  { key: '0', name: 'Edward King 0', age: 32, address: 'London, Park Lane no. 0' },
  { key: '1', name: 'Edward King 1', age: 32, address: 'London, Park Lane no. 1' },
])

const count = computed(() => dataSource.value.length + 1)
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

function onDelete(key: string) {
  dataSource.value = dataSource.value.filter(item => item.key !== key)
}

function handleAdd() {
  const newData: DataType = {
    key: `${count.value}`,
    name: `Edward King ${count.value}`,
    age: 32,
    address: `London, Park Lane no. ${count.value}`,
  }
  dataSource.value.push(newData)
}
</script>

<template>
  <a-button style="margin-bottom: 8px;" @click="handleAdd">Add</a-button>
  <a-table bordered :columns="columns" :data-source="dataSource">
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex === 'name'">
        <div style="position: relative;">
          <div v-if="editableData[record.key]" style="padding-right: 24px;">
            <a-input
              v-model:value="editableData[record.key].name"
              @press-enter="save(record.key)"
            />
          </div>
          <div v-else style="padding: 5px 24px 5px 5px;">
            {{ text || ' ' }}
            <a style="margin-left: 8px;" @click="edit(record.key)">Edit</a>
          </div>
        </div>
      </template>
      <template v-else-if="column.dataIndex === 'operation'">
        <a-popconfirm
          v-if="dataSource.length"
          title="Sure to delete?"
          @confirm="onDelete(record.key)"
        >
          <a>Delete</a>
        </a-popconfirm>
      </template>
    </template>
  </a-table>
</template>
