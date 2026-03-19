<script setup lang="ts">
import { ref } from 'vue'
const collapsed = ref(false)
</script>

<template>
  <a-layout style="min-height: 300px" has-sider>
    <a-layout-sider
      v-model:collapsed="collapsed"
      collapsible
      theme="dark"
    >
      <div style="padding: 16px; color: #fff">Sider {{ collapsed ? '(collapsed)' : '' }}</div>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0 16px">
        Header
      </a-layout-header>
      <a-layout-content style="padding: 24px">
        Content area. Sider is {{ collapsed ? 'collapsed' : 'expanded' }}.
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
