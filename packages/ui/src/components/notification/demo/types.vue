<template>
  <a-space>
    <a-button @click="openSuccess">Success</a-button>
    <a-button @click="openInfo">Info</a-button>
    <a-button @click="openWarning">Warning</a-button>
    <a-button @click="openError">Error</a-button>
  </a-space>
</template>

<script setup lang="ts">
import { notification } from '@ant-design-vue/ui'

function openSuccess() {
  notification.success({
    message: 'Notification Title',
    description: 'This is a success notification.',
  })
}
function openInfo() {
  notification.info({
    message: 'Notification Title',
    description: 'This is an info notification.',
  })
}
function openWarning() {
  notification.warning({
    message: 'Notification Title',
    description: 'This is a warning notification.',
  })
}
function openError() {
  notification.error({
    message: 'Notification Title',
    description: 'This is an error notification.',
  })
}
</script>
