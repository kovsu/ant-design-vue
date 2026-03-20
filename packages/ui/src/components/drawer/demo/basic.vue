<template>
  <a-button variant="solid" @click="open = true">Open Drawer</a-button>
  <a-drawer
    v-model:open="open"
    title="Basic Drawer"
  >
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const open = ref(false)
</script>
