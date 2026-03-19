<script setup lang="ts">
import { ref } from 'vue'

const disabled = ref(true)
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <a-switch disabled />
    <a-switch disabled checked />
    <a-button size="sm" @click="disabled = !disabled">Toggle disabled</a-button>
    <a-switch :disabled="disabled" />
  </div>
</template>
