<script setup lang="ts">
import { ref } from 'vue'

const collapsed = ref(false)
const selectedKeys = ref(['1'])
</script>

<template>
  <a-layout style="min-height: 300px" has-sider>
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible theme="dark">
      <div style="height: 32px; margin: 16px; background: rgba(255, 255, 255, 0.3);" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <span>nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <span>nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <span>nav 3</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0;">
        <a-button
          variant="text"
          style="font-size: 16px; width: 64px; height: 64px;"
          @click="collapsed = !collapsed"
        >
          {{ collapsed ? '>' : '<' }}
        </a-button>
      </a-layout-header>
      <a-layout-content style="margin: 24px 16px; padding: 24px; background: #fff; min-height: 280px;">
        Content
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
