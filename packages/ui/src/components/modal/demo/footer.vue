<template>
  <a-button variant="solid" @click="open = true">Open Modal with custom footer</a-button>
  <a-modal v-model:open="open" title="Custom Footer">
    <p>Some contents...</p>
    <template #footer>
      <a-button @click="open = false">Return</a-button>
      <a-button variant="solid" @click="open = false">Submit</a-button>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const open = ref(false)
</script>
