<template>
  <a-button @click="success">Customized style</a-button>
</template>

<script setup lang="ts">
import { message } from '@ant-design-vue/ui'

function success() {
  message.open({
    content: 'This is a prompt message with custom className and style',
    type: 'success',
    class: 'custom-class',
    style: {
      marginTop: '20vh',
    },
  })
}
</script>
