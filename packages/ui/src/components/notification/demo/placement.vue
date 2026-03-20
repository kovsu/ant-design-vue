<template>
  <a-space>
    <a-button @click="open('topLeft')">Top Left</a-button>
    <a-button @click="open('topRight')">Top Right</a-button>
    <a-button @click="open('bottomLeft')">Bottom Left</a-button>
    <a-button @click="open('bottomRight')">Bottom Right</a-button>
  </a-space>
</template>

<script setup lang="ts">
import { notification } from '@ant-design-vue/ui'

function open(placement: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight') {
  notification.info({
    message: `Notification ${placement}`,
    description: 'This is the content of the notification.',
    placement,
  })
}
</script>
