<template>
  <a-button variant="solid" @click="open = true">Open Drawer with footer</a-button>
  <a-drawer
    v-model:open="open"
    title="Drawer with Footer"
  >
    <p>Some contents...</p>
    <template #footer>
      <div style="text-align: right">
        <a-button style="margin-right: 8px" @click="open = false">Cancel</a-button>
        <a-button variant="solid" @click="open = false">Submit</a-button>
      </div>
    </template>
  </a-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const open = ref(false)
</script>
