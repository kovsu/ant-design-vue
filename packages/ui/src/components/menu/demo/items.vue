<template>
  <div style="width: 256px;">
    <a-menu
      v-model:selected-keys="selectedKeys"
      v-model:open-keys="openKeys"
      mode="inline"
      :items="items"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedKeys = ref(['1'])
const openKeys = ref(['sub1'])

const items = [
  {
    key: 'sub1',
    label: 'Navigation One',
    children: [
      {
        type: 'group' as const,
        label: 'Item 1',
        children: [
          { key: '1', label: 'Option 1' },
          { key: '2', label: 'Option 2' },
        ],
      },
      {
        type: 'group' as const,
        label: 'Item 2',
        children: [
          { key: '3', label: 'Option 3' },
          { key: '4', label: 'Option 4' },
        ],
      },
    ],
  },
  {
    key: 'sub2',
    label: 'Navigation Two',
    children: [
      { key: '5', label: 'Option 5' },
      { key: '6', label: 'Option 6' },
      { type: 'divider' as const },
      {
        key: 'sub3',
        label: 'Submenu',
        children: [
          { key: '7', label: 'Option 7' },
          { key: '8', label: 'Option 8' },
        ],
      },
    ],
  },
]
</script>
