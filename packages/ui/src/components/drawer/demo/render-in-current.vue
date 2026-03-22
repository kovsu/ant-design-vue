<template>
  <div
    :style="{
      height: '200px',
      overflow: 'hidden',
      position: 'relative',
      border: '1px solid #ebedf0',
      borderRadius: '2px',
      padding: '48px',
      textAlign: 'center',
      background: '#fafafa',
    }"
  >
    Render in this
    <div style="margin-top: 16px;">
      <a-button variant="solid" @click="open = true">Open</a-button>
    </div>
    <a-drawer
      v-model:open="open"
      title="Basic Drawer"
      placement="right"
      :closable="false"
      :style="{ position: 'absolute' }"
    >
      <p>Some contents...</p>
    </a-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
</script>
