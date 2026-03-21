<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)
const data = ['Item 1', 'Item 2', 'Item 3']
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <a-switch v-model:checked="loading" />
    <a-list bordered :data-source="data" :loading="loading">
      <template #renderItem="{ item }">
        <a-list-item>{{ item }}</a-list-item>
      </template>
    </a-list>
  </div>
</template>
