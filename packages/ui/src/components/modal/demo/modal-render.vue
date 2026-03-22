<template>
  <div>
    <a-button variant="solid" @click="open = true">Open Draggable Modal</a-button>
    <a-modal
      v-model:open="open"
      :wrap-style="{ overflow: 'hidden' }"
      @ok="open = false"
    >
      <template #title>
        <div ref="modalTitleRef" style="width: 100%; cursor: move">Draggable Modal</div>
      </template>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
const modalTitleRef = ref<HTMLElement | null>(null)
</script>
