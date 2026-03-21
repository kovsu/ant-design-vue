<script setup lang="ts">
import { ref } from 'vue'

const selectedKeys = ref(['1'])

const menuItems = [
  { key: '1', label: 'Home' },
  { key: '2', label: 'Products' },
  { key: '3', label: 'About' },
]
</script>

<template>
  <a-layout>
    <a-layout-header
      style="position: sticky; top: 0; z-index: 1; width: 100%; display: flex; align-items: center; background: #001529"
    >
      <div style="width: 120px; height: 31px; margin-right: 24px; background: rgba(255, 255, 255, 0.2); border-radius: 4px" />
      <a-menu
        v-model:selected-keys="selectedKeys"
        theme="dark"
        mode="horizontal"
        :items="menuItems"
        style="flex: 1; min-width: 0"
      />
    </a-layout-header>
    <a-layout-content style="padding: 0 48px">
      <div style="padding: 24px; min-height: 600px; background: #fff; margin-top: 16px">
        Scroll down to see the fixed header remain at the top.
        <br /><br />
        <p v-for="i in 20" :key="i">Content line {{ i }}</p>
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center; background: #f5f5f5">
      Ant Design Vue &copy; 2024
    </a-layout-footer>
  </a-layout>
</template>
