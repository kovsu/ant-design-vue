<script setup lang="ts">
import { ref } from 'vue'

const value = ref(30)
const disabled = ref(false)
</script>

<template>
  <div style="max-width: 400px;">
    <a-slider v-model:value="value" />
    <a-slider v-model:value="value" :disabled="disabled" />
    <div style="margin-top: 16px;">
      Disabled: <input v-model="disabled" type="checkbox" />
    </div>
  </div>
</template>
