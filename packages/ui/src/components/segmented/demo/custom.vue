<script setup lang="ts">
import { ref } from 'vue'

const value = ref('user1')
const value2 = ref('spring')

const userOptions = [
  {
    value: 'user1',
    label: 'User 1',
  },
  {
    value: 'user2',
    label: 'User 2',
  },
  {
    value: 'user3',
    label: 'User 3',
  },
]

const seasonOptions = [
  { value: 'spring', label: 'Spring' },
  { value: 'summer', label: 'Summer' },
  { value: 'autumn', label: 'Autumn' },
  { value: 'winter', label: 'Winter' },
]
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 24px;">
    <a-segmented v-model:value="value" :options="userOptions">
      <template #label="{ value: val, label }">
        <div style="padding: 4px;">
          <div style="width: 32px; height: 32px; border-radius: 50%; background: #f56a00; color: #fff; display: flex; align-items: center; justify-content: center; margin: 0 auto;">
            {{ (val as string).charAt(0).toUpperCase() }}
          </div>
          <div style="margin-top: 4px; text-align: center;">{{ label }}</div>
        </div>
      </template>
    </a-segmented>

    <a-segmented v-model:value="value2" :options="seasonOptions">
      <template #label="{ label }">
        <div style="padding: 4px;">
          <div style="font-weight: 600;">{{ label }}</div>
        </div>
      </template>
    </a-segmented>
  </div>
</template>
