<script setup lang="ts">
import { ref } from 'vue'

const value = ref(3)
</script>

<template>
  <div>
    <a-input-number v-model:value="value" :bordered="false" :min="1" :max="10" />
  </div>
</template>
