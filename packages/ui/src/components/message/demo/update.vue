<template>
  <a-button variant="solid" @click="openMessage">Open the message box</a-button>
</template>

<script setup lang="ts">
import { message } from '@ant-design-vue/ui'

const key = 'updatable'

function openMessage() {
  message.open({ content: 'Loading...', key, type: 'loading' })
  setTimeout(() => {
    message.open({ content: 'Loaded!', key, type: 'success', duration: 2 })
  }, 1000)
}
</script>
