<script setup lang="ts">
import { ref } from 'vue'

const collapsed = ref(false)

const menuItems = [
  { key: '1', label: 'Nav 1' },
  { key: '2', label: 'Nav 2' },
  { key: '3', label: 'Nav 3' },
  { key: '4', label: 'Nav 4' },
]

function onBreakpoint(broken: boolean) {
  console.log('breakpoint', broken)
}
</script>

<template>
  <a-layout style="min-height: 300px" has-sider>
    <a-layout-sider
      v-model:collapsed="collapsed"
      breakpoint="lg"
      :collapsed-width="0"
      theme="dark"
      @breakpoint="onBreakpoint"
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
      <a-layout-content style="padding: 24px">
        Content — resize the browser to see the sider collapse.
      </a-layout-content>
      <a-layout-footer style="text-align: center; background: #f5f5f5">
        Footer
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
