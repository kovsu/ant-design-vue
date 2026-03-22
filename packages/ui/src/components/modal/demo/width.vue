<template>
  <div>
    <a-button variant="solid" @click="open = true">Open Modal of 1000px width</a-button>
    <a-modal
      v-model:open="open"
      width="1000px"
      title="Basic Modal"
      @ok="open = false"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const open = ref(false)
</script>
