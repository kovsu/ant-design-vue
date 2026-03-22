<template>
  <a-input v-model:value="value" :bordered="false" placeholder="Borderless" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
</script>
