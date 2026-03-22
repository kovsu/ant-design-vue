<template>
  <div>
    <a-button variant="solid" @click="open = true">Open Full Screen Modal</a-button>
    <a-modal
      v-model:open="open"
      title="Full Screen Modal"
      width="100%"
      wrap-class-name="full-modal"
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

<style>
.full-modal .ant-modal {
  max-width: 100%;
  top: 0;
  padding-bottom: 0;
  margin: 0;
}
.full-modal .ant-modal-content {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.full-modal .ant-modal-body {
  flex: 1;
}
</style>
