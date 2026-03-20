<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px">
    <h4>Basic Select</h4>
    <a-select
      v-model:value="value"
      placeholder="Please select"
      :options="options"
    />

    <h4>With Allow Clear</h4>
    <a-select
      v-model:value="value2"
      placeholder="Select with clear"
      :options="options"
      allow-clear
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string | undefined>(undefined)
const value2 = ref('lucy')

const options = [
  { value: 'jack', label: 'Jack' },
  { value: 'lucy', label: 'Lucy' },
  { value: 'tom', label: 'Tom' },
  { value: 'disabled', label: 'Disabled', disabled: true },
]
</script>
