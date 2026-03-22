<template>
  <div style="max-width: 300px">
    <h4>Custom Input Component</h4>
    <a-auto-complete
      v-model:value="value"
      :options="options"
      style="width: 200px"
      @search="handleSearch"
    >
      <a-textarea
        placeholder="Type here"
        style="height: 50px"
      />
    </a-auto-complete>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const options = ref<{ value: string }[]>([])

const handleSearch = (val: string) => {
  options.value = !val
    ? []
    : [{ value: val }, { value: val + val }, { value: val + val + val }]
}
</script>
