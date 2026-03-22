<template>
  <div>
    <a-button variant="solid" @click="open = true">Open</a-button>
    <a-drawer
      v-model:open="open"
      title="Multi-level drawer"
      :width="520"
      :closable="false"
    >
      <a-button variant="solid" @click="childOpen = true">Two-level drawer</a-button>

      <a-drawer
        v-model:open="childOpen"
        title="Two-level Drawer"
        :width="320"
        :closable="false"
      >
        <p>This is a two-level drawer.</p>
      </a-drawer>

      <template #footer>
        <div style="text-align: right;">
          <a-button style="margin-right: 8px;" @click="open = false">Cancel</a-button>
          <a-button variant="solid" @click="open = false">Submit</a-button>
        </div>
      </template>
    </a-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
const childOpen = ref(false)
</script>
