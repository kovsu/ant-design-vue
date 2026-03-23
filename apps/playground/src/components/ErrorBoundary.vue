<template>
  <div v-if="error" class="error-boundary">
    <span class="error-boundary-icon">&#9888;</span>
    <span>{{ error.message }}</span>
  </div>
  <slot v-else />
</template>

<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue'

const error = ref<Error | null>(null)

onErrorCaptured((err) => {
  error.value = err instanceof Error ? err : new Error(String(err))
  return false
})
</script>

<style>
.error-boundary {
  padding: 12px 16px;
  background: #fff2f0;
  border: 1px solid #ffccc7;
  border-radius: 6px;
  color: #ff4d4f;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.error-boundary-icon {
  font-size: 16px;
}
</style>
