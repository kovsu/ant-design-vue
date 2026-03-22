<template>
  <div style="max-width: 300px">
    <h4>Non-case-sensitive AutoComplete</h4>
    <a-auto-complete
      v-model:value="value"
      :options="options"
      style="width: 200px"
      placeholder="Try typing 'burns'"
      :filter-option="filterOption"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const filterOption = (input: string, option: { value: string }) => {
  return option.value.toUpperCase().includes(input.toUpperCase())
}

const value = ref('')

const options = [
  { value: 'Burns Bay Road' },
  { value: 'Downing Street' },
  { value: 'Wall Street' },
]
</script>
