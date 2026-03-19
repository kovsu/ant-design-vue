<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(false)
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <a-checkbox v-model:checked="checked">Checkbox</a-checkbox>
    <p>Checked: {{ checked }}</p>
  </div>
</template>
