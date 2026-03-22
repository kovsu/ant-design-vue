<template>
  <a-button variant="solid" @click="info">Display normal message</a-button>
</template>

<script setup lang="ts">
import { message } from '@ant-design-vue/ui'

function info() {
  message.info('This is a normal message')
}
</script>
