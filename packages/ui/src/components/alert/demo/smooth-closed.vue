<template>
  <a-alert
    v-if="visible"
    message="Alert Message Text"
    type="success"
    closable
    :after-close="handleClose"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(true)

const handleClose = () => {
  visible.value = false
}
</script>
