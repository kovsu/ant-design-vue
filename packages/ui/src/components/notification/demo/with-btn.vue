<template>
  <a-button variant="solid" @click="openNotification">Open the notification box</a-button>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { notification } from '@ant-design-vue/ui'

function openNotification() {
  const key = `open${Date.now()}`
  notification.open({
    message: 'Notification Title',
    description:
      'A function will be called after the notification is closed (automatically after the "duration" time or manually).',
    btn: () =>
      h(
        'button',
        {
          class: 'ant-btn ant-btn-solid ant-btn-sm',
          onClick: () => notification.close(key),
        },
        'Confirm',
      ),
    key,
    onClose: () => {
      console.log('Notification was closed.')
    },
  })
}
</script>
