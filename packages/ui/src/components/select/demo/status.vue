<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px">
    <h4>Status</h4>
    <a-select
      status="error"
      style="width: 100%"
      placeholder="Error status"
      :options="options"
    />
    <a-select
      status="warning"
      style="width: 100%"
      placeholder="Warning status"
      :options="options"
    />
  </div>
</template>

<script setup lang="ts">
const options = [
  { value: 'jack', label: 'Jack' },
  { value: 'lucy', label: 'Lucy' },
]
</script>
