<template>
  <div style="max-width: 300px">
    <h4>Custom Dropdown Menu</h4>
    <a-select
      v-model:value="value"
      placeholder="Custom dropdown render"
      style="width: 100%"
      :options="items.map(item => ({ value: item, label: item }))"
    >
      <template #dropdownRender="{ menuNode }">
        <component :is="menuNode" />
        <a-divider style="margin: 4px 0" />
        <div style="padding: 4px 8px; display: flex; gap: 8px">
          <a-input
            v-model:value="name"
            placeholder="Enter new item"
            style="flex: 1"
          />
          <a-button type="text" @click="addItem">
            + Add item
          </a-button>
        </div>
      </template>
    </a-select>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

let index = 0
const items = ref(['Jack', 'Lucy'])
const value = ref<string | undefined>(undefined)
const name = ref('')

const addItem = () => {
  items.value.push(name.value || `New item ${(index += 1)}`)
  name.value = ''
}
</script>
