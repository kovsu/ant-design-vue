<template>
  <a-space>
    <a-button @click="showConfirm">Confirm</a-button>
    <a-button @click="showInfo">Info</a-button>
    <a-button @click="showSuccess">Success</a-button>
    <a-button @click="showError">Error</a-button>
    <a-button @click="showWarning">Warning</a-button>
  </a-space>
</template>

<script setup lang="ts">
import { Modal } from '@ant-design-vue/ui'

function showConfirm() {
  Modal.confirm({
    title: 'Do you want to delete these items?',
    content: 'When clicked the OK button, this dialog will be closed after 1 second.',
    onOk() {
      return new Promise((resolve) => setTimeout(resolve, 1000))
    },
    onCancel() {},
  })
}

function showInfo() {
  Modal.info({
    title: 'This is a notification message',
    content: 'Some additional information.',
  })
}

function showSuccess() {
  Modal.success({
    title: 'This is a success message',
    content: 'Some additional information.',
  })
}

function showError() {
  Modal.error({
    title: 'This is an error message',
    content: 'Some additional information.',
  })
}

function showWarning() {
  Modal.warning({
    title: 'This is a warning message',
    content: 'Some additional information.',
  })
}
</script>
