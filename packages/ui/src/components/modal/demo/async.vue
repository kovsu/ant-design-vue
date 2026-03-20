<template>
  <a-button variant="solid" @click="open = true">Open Modal with async logic</a-button>
  <a-modal
    v-model:open="open"
    title="Async Close"
    :confirm-loading="confirmLoading"
    @ok="handleOk"
  >
    <p>{{ modalText }}</p>
  </a-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
const confirmLoading = ref(false)
const modalText = ref('Content of the modal')

function handleOk() {
  modalText.value = 'The modal will be closed after two seconds'
  confirmLoading.value = true
  setTimeout(() => {
    open.value = false
    confirmLoading.value = false
    modalText.value = 'Content of the modal'
  }, 2000)
}
</script>
