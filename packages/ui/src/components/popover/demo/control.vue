<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)

function hide() {
  open.value = false
}
</script>

<template>
  <div style="padding: 40px;">
    <a-popover v-model:open="open" title="Title" trigger="click">
      <template #content>
        <a @click="hide">Close</a>
      </template>
      <a-button variant="solid">Click me</a-button>
    </a-popover>
  </div>
</template>
