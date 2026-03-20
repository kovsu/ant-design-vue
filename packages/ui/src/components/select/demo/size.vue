<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px">
    <a-select placeholder="Small" size="small" :options="options" />
    <a-select placeholder="Middle (default)" :options="options" />
    <a-select placeholder="Large" size="large" :options="options" />
  </div>
</template>

<script setup lang="ts">
const options = [
  { value: 'jack', label: 'Jack' },
  { value: 'lucy', label: 'Lucy' },
  { value: 'tom', label: 'Tom' },
]
</script>
