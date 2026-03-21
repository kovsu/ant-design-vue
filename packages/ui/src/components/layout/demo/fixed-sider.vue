<script setup lang="ts">
const menuItems = [
  { key: '1', label: 'Nav 1' },
  { key: '2', label: 'Nav 2' },
  { key: '3', label: 'Nav 3' },
  { key: '4', label: 'Nav 4' },
]
</script>

<template>
  <a-layout style="min-height: 400px" has-sider>
    <a-layout-sider
      theme="dark"
      style="overflow: auto; height: 100vh; position: sticky; top: 0; left: 0"
    >
      <div style="padding: 16px; color: #fff">Logo</div>
      <a-menu
        theme="dark"
        mode="inline"
        :default-selected-keys="['1']"
        :items="menuItems"
      />
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0 16px">
        Header
      </a-layout-header>
      <a-layout-content style="padding: 24px; overflow: initial">
        <div style="padding: 24px; background: #fff">
          <p v-for="i in 30" :key="i">Content line {{ i }} — scroll to see the fixed sider.</p>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center; background: #f5f5f5">
        Footer
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
