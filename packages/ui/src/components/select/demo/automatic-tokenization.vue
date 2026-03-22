<template>
  <div style="max-width: 400px">
    <h4>Automatic Tokenization</h4>
    <p style="margin-bottom: 8px; color: #666">Try copying "Lucy,Jack" into the input</p>
    <a-select
      v-model:value="value"
      mode="tags"
      style="width: 100%"
      :token-separators="[',']"
      placeholder="Automatic tokenization"
      :options="options"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string[]>([])

const options = [
  { value: 'jack', label: 'Jack' },
  { value: 'lucy', label: 'Lucy' },
  { value: 'tom', label: 'Tom' },
]
</script>
