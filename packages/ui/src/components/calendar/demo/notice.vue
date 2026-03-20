<template>
  <a-calendar v-model:value="value">
    <template #dateCellRender="{ current }">
      <ul v-if="getListData(current).length" style="list-style: none; padding: 0; margin: 0">
        <li
          v-for="item in getListData(current)"
          :key="item.content"
          :style="{ color: item.type === 'error' ? 'var(--color-error)' : item.type === 'warning' ? 'var(--color-warning)' : 'var(--color-success)' }"
          style="font-size: 12px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap"
        >
          {{ item.content }}
        </li>
      </ul>
    </template>
  </a-calendar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'

const value = ref<Dayjs>(dayjs())

function getListData(date: Dayjs) {
  const d = date.date()
  if (d === 8) return [{ type: 'warning', content: 'Meeting at 3pm' }]
  if (d === 15) return [{ type: 'success', content: 'Release day' }, { type: 'error', content: 'Bug fix due' }]
  if (d === 22) return [{ type: 'error', content: 'Deadline' }]
  return []
}
</script>
