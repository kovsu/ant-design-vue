<template>
  <a-button variant="solid" @click="openNotification">Open Notification</a-button>
</template>

<script setup lang="ts">
import { notification } from '@ant-design-vue/ui'

function openNotification() {
  notification.open({
    message: 'Notification Title',
    description: 'This is the content of the notification. This is the content of the notification.',
  })
}
</script>
