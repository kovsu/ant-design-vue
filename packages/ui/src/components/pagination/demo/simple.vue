<template>
  <a-pagination v-model:current="current" :total="50" simple />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const current = ref(1)
</script>
