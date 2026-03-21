<script setup lang="ts">
import { h } from 'vue'
import type { RenderEmptyHandler } from '../../config-provider/types'

const renderEmpty: RenderEmptyHandler = (componentName) => {
  if (componentName === 'Select') {
    return h('span', 'No options available')
  }
  if (componentName === 'Table') {
    return h('span', 'No data')
  }
  return h('span', 'Nothing here')
}
</script>

<template>
  <a-config-provider :render-empty="renderEmpty">
    <div style="display: flex; flex-direction: column; gap: 24px">
      <div>
        <h4>Select</h4>
        <a-select style="width: 200px" />
      </div>
      <div>
        <h4>TreeSelect</h4>
        <a-tree-select style="width: 200px" />
      </div>
      <div>
        <h4>Table</h4>
        <a-table :columns="[{ title: 'Name', dataIndex: 'name' }, { title: 'Age', dataIndex: 'age' }]" :data-source="[]" />
      </div>
    </div>
  </a-config-provider>
</template>
