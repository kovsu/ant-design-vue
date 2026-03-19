<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)

function toggleLoading() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
</script>

<template>
  <div style="display: flex; flex-wrap: wrap; gap: 8px">
    <a-button variant="solid" :loading="true">Loading</a-button>
    <a-button variant="outlined" :loading="{ delay: 500 }" @click="toggleLoading">
      Click me (delay 500ms)
    </a-button>
    <a-button variant="solid" :loading="loading" @click="toggleLoading">
      Click to load
    </a-button>
  </div>
</template>
