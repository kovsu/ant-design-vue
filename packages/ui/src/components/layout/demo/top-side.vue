<script setup lang="ts">
import { ref } from 'vue'

const topSelectedKeys = ref(['1'])
const siderSelectedKeys = ref(['1-1'])
const openKeys = ref(['sub1'])

const topMenuItems = [
  { key: '1', label: 'Navigation One' },
  { key: '2', label: 'Navigation Two' },
  { key: '3', label: 'Navigation Three' },
]

const siderMenuItems = [
  {
    key: 'sub1',
    label: 'Subnav 1',
    children: [
      { key: '1-1', label: 'Option 1' },
      { key: '1-2', label: 'Option 2' },
      { key: '1-3', label: 'Option 3' },
      { key: '1-4', label: 'Option 4' },
    ],
  },
  {
    key: 'sub2',
    label: 'Subnav 2',
    children: [
      { key: '2-1', label: 'Option 5' },
      { key: '2-2', label: 'Option 6' },
    ],
  },
]
</script>

<template>
  <a-layout>
    <a-layout-header style="display: flex; align-items: center; background: #001529">
      <div style="width: 120px; height: 31px; margin-right: 24px; background: rgba(255, 255, 255, 0.2); border-radius: 4px" />
      <a-menu
        v-model:selected-keys="topSelectedKeys"
        theme="dark"
        mode="horizontal"
        :items="topMenuItems"
        style="flex: 1; min-width: 0"
      />
    </a-layout-header>
    <a-layout has-sider>
      <a-layout-sider :width="200" theme="light">
        <a-menu
          v-model:selected-keys="siderSelectedKeys"
          v-model:open-keys="openKeys"
          mode="inline"
          :items="siderMenuItems"
          style="height: 100%; border-right: 0"
        />
      </a-layout-sider>
      <a-layout style="padding: 24px">
        <a-layout-content style="padding: 24px; min-height: 280px; background: #fff">
          Content
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
