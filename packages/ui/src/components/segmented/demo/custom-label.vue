<script setup lang="ts">
import { ref } from 'vue'

const value = ref('list')
const options = [
  { value: 'list', label: 'List' },
  { value: 'kanban', label: 'Kanban' },
  { value: 'calendar', label: 'Calendar' },
]
</script>

<template>
  <a-segmented v-model:value="value" :options="options">
    <template #label="{ label }">
      <span style="padding: 0 4px; font-weight: 500;">{{ label }}</span>
    </template>
  </a-segmented>
</template>
