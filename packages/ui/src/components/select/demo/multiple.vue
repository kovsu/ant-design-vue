<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px">
    <h4>Multiple Select</h4>
    <a-select
      v-model:value="value"
      mode="multiple"
      placeholder="Select multiple items"
      :options="options"
    />

    <h4>Tags Mode</h4>
    <a-select
      v-model:value="tags"
      mode="tags"
      placeholder="Enter tags"
      :options="options"
      :token-separators="[',']"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string[]>(['jack', 'lucy'])
const tags = ref<string[]>([])

const options = [
  { value: 'jack', label: 'Jack' },
  { value: 'lucy', label: 'Lucy' },
  { value: 'tom', label: 'Tom' },
  { value: 'jerry', label: 'Jerry' },
  { value: 'spike', label: 'Spike' },
]
</script>
