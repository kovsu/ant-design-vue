<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px">
    <h4>Status</h4>
    <a-tree-select
      status="error"
      style="width: 100%"
      placeholder="Error"
    />
    <a-tree-select
      status="warning"
      style="width: 100%"
      multiple
      placeholder="Warning multiple"
    />
  </div>
</template>

<script setup lang="ts">
</script>
