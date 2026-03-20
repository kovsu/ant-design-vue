<template>
  <a-space direction="vertical">
    <a-pagination v-model:current="current" :total="50" size="small" />
    <a-pagination v-model:current="current2" :total="50" size="small" show-size-changer show-quick-jumper />
  </a-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const current = ref(1)
const current2 = ref(1)
</script>
