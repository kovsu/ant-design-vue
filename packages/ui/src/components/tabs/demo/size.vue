<template>
  <div>
    <a-radio-group v-model:value="size" style="margin-bottom: 16px">
      <a-radio-button value="sm">Small</a-radio-button>
      <a-radio-button value="md">Default</a-radio-button>
      <a-radio-button value="lg">Large</a-radio-button>
    </a-radio-group>
    <a-tabs v-model:activeKey="activeKey" :size="size">
      <a-tab-pane key="1" tab="Tab 1">Content of tab 1</a-tab-pane>
      <a-tab-pane key="2" tab="Tab 2">Content of tab 2</a-tab-pane>
      <a-tab-pane key="3" tab="Tab 3">Content of tab 3</a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const size = ref<'sm' | 'md' | 'lg'>('sm')
const activeKey = ref('1')
</script>
