<template>
  <a-tabs v-model:active-key="activeKey" centered>
    <a-tab-pane key="1" tab="Tab 1">Content of Tab 1</a-tab-pane>
    <a-tab-pane key="2" tab="Tab 2">Content of Tab 2</a-tab-pane>
    <a-tab-pane key="3" tab="Tab 3">Content of Tab 3</a-tab-pane>
  </a-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const activeKey = ref('1')
</script>
