<script setup lang="ts">
import { computed, reactive } from 'vue'
import type { Key } from '../types'

interface DataType {
  key: Key
  name: string
  age: number
  address: string
}

const columns = [
  { title: 'Name', dataIndex: 'name' },
  { title: 'Age', dataIndex: 'age' },
  { title: 'Address', dataIndex: 'address' },
]

const data: DataType[] = Array.from({ length: 46 }, (_, i) => ({
  key: i,
  name: `Edward King ${i}`,
  age: 32,
  address: `London, Park Lane no. ${i}`,
}))

const state = reactive<{ selectedRowKeys: Key[]; loading: boolean }>({
  selectedRowKeys: [],
  loading: false,
})

const hasSelected = computed(() => state.selectedRowKeys.length > 0)

function start() {
  state.loading = true
  setTimeout(() => {
    state.loading = false
    state.selectedRowKeys = []
  }, 1000)
}

function onSelectChange(keys: Key[]) {
  state.selectedRowKeys = keys
}
</script>

<template>
  <div>
    <div style="margin-bottom: 16px">
      <a-button type="primary" :disabled="!hasSelected" :loading="state.loading" @click="start">
        Reload
      </a-button>
      <span style="margin-left: 8px">
        <template v-if="hasSelected">
          {{ `Selected ${state.selectedRowKeys.length} items` }}
        </template>
      </span>
    </div>
    <a-table
      :columns="columns"
      :data-source="data"
      :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange }"
    />
  </div>
</template>
