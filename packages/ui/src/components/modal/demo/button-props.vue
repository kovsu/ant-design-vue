<template>
  <div>
    <a-button variant="solid" @click="open = true">
      Open Modal with customized button props
    </a-button>
    <a-modal
      v-model:open="open"
      title="Basic Modal"
      :ok-button-props="{ disabled: true }"
      :cancel-button-props="{ disabled: true }"
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
