<template>
  <a-button variant="solid" @click="openNotification">Open the notification box</a-button>
</template>

<script setup lang="ts">
import { notification } from '@ant-design-vue/ui'

function openNotification() {
  notification.open({
    message: 'Notification Title',
    description:
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    style: {
      width: '600px',
      marginLeft: `${335 - 600}px`,
    },
    class: 'notification-custom-class',
  })
}
</script>
