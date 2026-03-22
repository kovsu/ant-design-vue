<template>
  <div style="max-width: 300px">
    <h4>Remote Search Box</h4>
    <a-select
      v-model:value="value"
      show-search
      placeholder="Search to find options"
      style="width: 100%"
      :default-active-first-option="false"
      :show-arrow="false"
      :filter-option="false"
      :not-found-content="null"
      :options="data"
      @search="handleSearch"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const data = ref<{ value: string; label: string }[]>([])
const value = ref<string | undefined>(undefined)

let timeout: ReturnType<typeof setTimeout> | null = null

const handleSearch = (val: string) => {
  if (timeout) {
    clearTimeout(timeout)
    timeout = null
  }
  if (!val) {
    data.value = []
    return
  }
  timeout = setTimeout(() => {
    // Simulate remote search with generated results
    data.value = [1, 2, 3].map(i => ({
      value: `${val}-${i}`,
      label: `${val} result ${i}`,
    }))
  }, 300)
}
</script>
