<template>
  <div style="display: flex; align-items: center; gap: 8px;">
    <span>Categories:</span>
    <a-checkable-tag
      v-for="tag in tags"
      :key="tag"
      :checked="selectedTags.includes(tag)"
      @change="(checked: boolean) => handleChange(tag, checked)"
    >
      {{ tag }}
    </a-checkable-tag>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tags = ['Movies', 'Books', 'Music', 'Sports']
const selectedTags = ref<string[]>([])

function handleChange(tag: string, checked: boolean) {
  if (checked) {
    selectedTags.value = [...selectedTags.value, tag]
  } else {
    selectedTags.value = selectedTags.value.filter(t => t !== tag)
  }
}
</script>
