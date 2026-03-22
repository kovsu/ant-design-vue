<template>
  <div>
    <a-button variant="solid" @click="openNotification">
      Open the notification box
    </a-button>
  </div>
</template>

<script setup lang="ts">
import { notification } from '@ant-design-vue/ui'

const key = 'updatable'

function openNotification() {
  notification.open({
    key,
    message: 'Notification Title',
    description: 'description.',
  })
  setTimeout(() => {
    notification.open({
      key,
      message: 'New Title',
      description: 'New description.',
    })
  }, 1000)
}
</script>
