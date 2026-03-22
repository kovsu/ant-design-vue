<template>
  <div>
    <a-button variant="solid" @click="visible = true">Show image preview</a-button>
    <a-image
      :width="200"
      :style="{ display: 'none' }"
      :preview="{ open: visible }"
      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      @click="visible = true"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>
