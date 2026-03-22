<template>
  <div style="display: flex; flex-direction: column; gap: 12px; max-width: 400px">
    <a-input-search
      v-model:value="value"
      placeholder="input search loading default"
      loading
    />
    <a-input-search
      v-model:value="value"
      placeholder="input search loading with enterButton"
      loading
      enter-button
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
</script>
