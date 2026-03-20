<template>
  <a-button @click="showLoading">Display a loading indicator</a-button>
</template>

<script setup lang="ts">
import { message } from '@ant-design-vue/ui'

function showLoading() {
  const hide = message.loading('Action in progress..', 0)
  // Dismiss after 2.5 seconds
  setTimeout(hide, 2500)
}
</script>
