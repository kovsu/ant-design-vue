<template>
  <a-button variant="solid" @click="open = true">Open Drawer with extra</a-button>
  <a-drawer
    v-model:open="open"
    title="Drawer with Extra"
  >
    <template #extra>
      <a-space>
        <a-button @click="open = false">Cancel</a-button>
        <a-button variant="solid" @click="open = false">Submit</a-button>
      </a-space>
    </template>
    <p>Some contents...</p>
  </a-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const open = ref(false)
</script>
