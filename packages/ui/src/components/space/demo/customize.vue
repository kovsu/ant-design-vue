<script setup lang="ts">
import { ref } from 'vue'

const gap = ref(8)
</script>

<template>
  <div>
    <div style="margin-bottom: 16px;">
      <span>Gap: {{ gap }}px</span>
      <a-slider v-model:value="gap" :min="0" :max="48" style="max-width: 300px;" />
    </div>
    <a-space :size="gap">
      <a-button variant="solid">Button 1</a-button>
      <a-button variant="solid">Button 2</a-button>
      <a-button variant="solid">Button 3</a-button>
    </a-space>
  </div>
</template>
