<template>
  <div style="display: flex; align-items: center; gap: 12px;">
    <a-image
      :width="200"
      :src="`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?${random}`"
      :placeholder="true"
    />
    <a-button variant="solid" @click="random = Date.now()">Reload</a-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const random = ref(Date.now())
</script>
