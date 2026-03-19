<template>
  <div style="display: flex; gap: 8px;">
    <a-checkable-tag
      v-for="tag in tags"
      :key="tag"
      v-model:checked="selectedTags[tag]"
    >
      {{ tag }}
    </a-checkable-tag>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const tags = ['Movies', 'Books', 'Music', 'Sports']
const selectedTags = reactive<Record<string, boolean>>({
  Movies: true,
  Books: false,
  Music: false,
  Sports: false,
})
</script>
