<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px">
    <h4>Search Select</h4>
    <a-select
      v-model:value="value"
      show-search
      placeholder="Search and select"
      :options="options"
    />

    <h4>Option Groups</h4>
    <a-select
      v-model:value="value2"
      show-search
      placeholder="Select from groups"
      :options="groupedOptions"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string | undefined>(undefined)
const value2 = ref<string | undefined>(undefined)

const options = [
  { value: 'beijing', label: 'Beijing' },
  { value: 'shanghai', label: 'Shanghai' },
  { value: 'guangzhou', label: 'Guangzhou' },
  { value: 'shenzhen', label: 'Shenzhen' },
  { value: 'hangzhou', label: 'Hangzhou' },
  { value: 'chengdu', label: 'Chengdu' },
]

const groupedOptions = [
  {
    label: 'China',
    options: [
      { value: 'beijing', label: 'Beijing' },
      { value: 'shanghai', label: 'Shanghai' },
    ],
  },
  {
    label: 'USA',
    options: [
      { value: 'newyork', label: 'New York' },
      { value: 'sanfrancisco', label: 'San Francisco' },
    ],
  },
]
</script>
