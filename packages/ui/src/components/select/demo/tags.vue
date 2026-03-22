<template>
  <div style="max-width: 400px">
    <h4>Tags Mode</h4>
    <p style="margin-bottom: 8px; color: #666">Type anything and press Enter to create a tag</p>
    <a-select
      v-model:value="value"
      mode="tags"
      style="width: 100%"
      placeholder="Tags Mode"
      :options="options"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string[]>([])

const options = [...Array(25)].map((_, i) => ({
  value: (i + 10).toString(36) + (i + 1),
  label: (i + 10).toString(36) + (i + 1),
}))
</script>
