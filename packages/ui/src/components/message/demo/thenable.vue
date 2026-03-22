<template>
  <a-button @click="showSequence">Display a sequence of messages</a-button>
</template>

<script setup lang="ts">
import { message } from '@ant-design-vue/ui'

function showSequence() {
  message
    .loading('Action in progress..', 2.5)
    .then(() => message.success('Loading finished', 2.5))
    .then(() => message.info('Loading finished is finished', 2.5))
}
</script>
