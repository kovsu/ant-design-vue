<template>
  <a-button variant="solid" @click="open = true">Vertically centered modal</a-button>
  <a-modal
    v-model:open="open"
    title="Centered Modal"
    centered
    @ok="open = false"
  >
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const open = ref(false)
</script>
