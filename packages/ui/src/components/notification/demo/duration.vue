<template>
  <a-button variant="solid" @click="openNotification">
    Open notification that never closes
  </a-button>
</template>

<script setup lang="ts">
import { notification } from '@ant-design-vue/ui'

function openNotification() {
  notification.open({
    message: 'Notification Title',
    description: 'I will never auto close. Click the close button to dismiss.',
    duration: null,
  })
}
</script>
