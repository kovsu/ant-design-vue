<script setup lang="ts">
import { ref } from 'vue'

const value = ref(3)
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <a-rate v-model:value="value" character="A" />
    <a-rate v-model:value="value" character="♥" />
    <a-rate v-model:value="value">
      <template #character>😀</template>
    </a-rate>
  </div>
</template>
