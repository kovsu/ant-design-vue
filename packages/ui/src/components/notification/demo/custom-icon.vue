<template>
  <a-button variant="solid" @click="openNotification">Open the notification box</a-button>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { notification } from '@ant-design-vue/ui'

function openNotification() {
  notification.open({
    message: 'Notification Title',
    description:
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    icon: () =>
      h('span', { style: 'color: #108ee9; font-size: 20px;' }, '\u263A'),
  })
}
</script>
