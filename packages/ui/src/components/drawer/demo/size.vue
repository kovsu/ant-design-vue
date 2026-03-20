<template>
  <a-space>
    <a-button variant="solid" @click="showDefault">Default Size</a-button>
    <a-button variant="solid" @click="showLarge">Large Size</a-button>
  </a-space>
  <a-drawer
    v-model:open="open"
    title="Drawer"
    :size="size"
  >
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const open = ref(false)
const size = ref<'default' | 'large'>('default')

function showDefault() {
  size.value = 'default'
  open.value = true
}

function showLarge() {
  size.value = 'large'
  open.value = true
}
</script>
