<template>
  <div style="max-width: 400px">
    <h4>Async Loading</h4>
    <a-mentions
      v-model:value="value"
      :options="options"
      placeholder="Type @ then a username"
      @search="onSearch"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const value = ref('')
const loading = ref(false)
const search = ref('')
const users = ref<{ login: string; avatar_url: string }[]>([])

let debounceTimer: ReturnType<typeof setTimeout> | null = null

const loadUsers = (key: string) => {
  if (!key) {
    users.value = []
    loading.value = false
    return
  }
  // Simulated async data loading
  loading.value = true
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    // Simulate fetched results
    users.value = [
      { login: `${key}_user1`, avatar_url: '' },
      { login: `${key}_user2`, avatar_url: '' },
      { login: `${key}_dev`, avatar_url: '' },
    ]
    loading.value = false
  }, 500)
}

const onSearch = (searchValue: string) => {
  search.value = searchValue
  users.value = []
  loadUsers(searchValue)
}

const options = computed(() =>
  users.value.map((user) => ({
    value: user.login,
    label: user.login,
  })),
)
</script>
