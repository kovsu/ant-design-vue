<script setup lang="ts">
import { ref } from 'vue'

const collapsed = ref(false)
const selectedKeys = ref(['1'])
</script>

<template>
  <a-layout style="min-height: 400px" has-sider>
    <a-layout-sider v-model:collapsed="collapsed" collapsible theme="dark">
      <div style="height: 32px; margin: 16px; background: rgba(255, 255, 255, 0.3);" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <span>Option 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <span>Option 2</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <template #title>
            <span>User</span>
          </template>
          <a-menu-item key="3">Tom</a-menu-item>
          <a-menu-item key="4">Bill</a-menu-item>
          <a-menu-item key="5">Alex</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <template #title>
            <span>Team</span>
          </template>
          <a-menu-item key="6">Team 1</a-menu-item>
          <a-menu-item key="8">Team 2</a-menu-item>
        </a-sub-menu>
        <a-menu-item key="9">
          <span>File</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0;" />
      <a-layout-content style="margin: 0 16px;">
        <a-breadcrumb style="margin: 16px 0;">
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb>
        <div style="padding: 24px; background: #fff; min-height: 360px;">
          Bill is a cat.
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center;">
        Ant Design Vue
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
