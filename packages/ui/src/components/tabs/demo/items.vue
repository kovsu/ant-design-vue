<template>
  <a-tabs v-model:active-key="activeKey" :items="items" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeKey = ref('1')
const items = [
  { key: '1', label: 'Tab 1', children: 'Content of Tab 1' },
  { key: '2', label: 'Tab 2', children: 'Content of Tab 2' },
  { key: '3', label: 'Tab 3', children: 'Content of Tab 3' },
]
</script>
