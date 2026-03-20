<template>
  <div style="display: flex; gap: 24px;">
    <div style="width: 256px;">
      <h4 style="margin-bottom: 16px;">Light Theme</h4>
      <a-menu
        v-model:selectedKeys="lightSelected"
        v-model:openKeys="lightOpen"
        mode="inline"
        theme="light"
      >
        <a-sub-menu menu-key="sub1" title="Navigation One">
          <a-menu-item item-key="1">Option 1</a-menu-item>
          <a-menu-item item-key="2">Option 2</a-menu-item>
        </a-sub-menu>
        <a-sub-menu menu-key="sub2" title="Navigation Two">
          <a-menu-item item-key="3">Option 3</a-menu-item>
          <a-menu-item item-key="4">Option 4</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </div>
    <div style="width: 256px;">
      <h4 style="margin-bottom: 16px;">Dark Theme</h4>
      <a-menu
        v-model:selectedKeys="darkSelected"
        v-model:openKeys="darkOpen"
        mode="inline"
        theme="dark"
      >
        <a-sub-menu menu-key="sub1" title="Navigation One">
          <a-menu-item item-key="1">Option 1</a-menu-item>
          <a-menu-item item-key="2">Option 2</a-menu-item>
        </a-sub-menu>
        <a-sub-menu menu-key="sub2" title="Navigation Two">
          <a-menu-item item-key="3">Option 3</a-menu-item>
          <a-menu-item item-key="4">Option 4</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const lightSelected = ref(['1'])
const lightOpen = ref(['sub1'])
const darkSelected = ref(['1'])
const darkOpen = ref(['sub1'])
</script>
