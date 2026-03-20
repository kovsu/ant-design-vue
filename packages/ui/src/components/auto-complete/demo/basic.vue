<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px">
    <h4>Basic AutoComplete</h4>
    <a-auto-complete
      v-model:value="value"
      :options="filteredOptions"
      placeholder="Type to search"
    />

    <h4>With Allow Clear</h4>
    <a-auto-complete
      v-model:value="value2"
      :options="staticOptions"
      placeholder="Select or type"
      allow-clear
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const value = ref('')
const value2 = ref('')

const allOptions = [
  { value: 'Burns Bay Road' },
  { value: 'Downing Street' },
  { value: 'Wall Street' },
]

const filteredOptions = computed(() =>
  value.value
    ? allOptions.filter((o) => o.value.toLowerCase().includes(value.value.toLowerCase()))
    : allOptions,
)

const staticOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
]
</script>
