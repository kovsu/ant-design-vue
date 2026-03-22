<template>
  <a-space>
    <a-button @click="success">Success</a-button>
    <a-button @click="error">Error</a-button>
    <a-button @click="warning">Warning</a-button>
  </a-space>
</template>

<script setup lang="ts">
import { message } from '@ant-design-vue/ui'

function success() {
  message.success('This is a success message')
}

function error() {
  message.error('This is an error message')
}

function warning() {
  message.warning('This is a warning message')
}
</script>
