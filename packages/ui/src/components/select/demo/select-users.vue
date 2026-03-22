<template>
  <div style="max-width: 400px">
    <h4>Search and Select Users</h4>
    <a-select
      v-model:value="selectedUsers"
      mode="multiple"
      label-in-value
      placeholder="Select users"
      style="width: 100%"
      :filter-option="false"
      :not-found-content="fetching ? undefined : null"
      :options="data"
      :loading="fetching"
      @search="fetchUsers"
    >
      <template v-if="fetching" #notFoundContent>
        <a-spin size="small" />
      </template>
    </a-select>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface UserOption {
  value: string
  label: string
}

const selectedUsers = ref<UserOption[]>([])
const data = ref<UserOption[]>([])
const fetching = ref(false)

let fetchId = 0
let debounceTimer: ReturnType<typeof setTimeout> | null = null

const fetchUsers = (searchValue: string) => {
  if (debounceTimer) clearTimeout(debounceTimer)

  debounceTimer = setTimeout(() => {
    fetchId += 1
    const currentFetchId = fetchId
    data.value = []
    fetching.value = true

    // Simulate API call with mock data
    setTimeout(() => {
      if (currentFetchId !== fetchId) return
      data.value = [
        { value: 'user1', label: `${searchValue} - Alice` },
        { value: 'user2', label: `${searchValue} - Bob` },
        { value: 'user3', label: `${searchValue} - Carol` },
      ]
      fetching.value = false
    }, 500)
  }, 300)
}
</script>
