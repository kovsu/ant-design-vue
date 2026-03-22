<template>
  <div>
    <a-switch
      :checked="currentTheme === 'dark'"
      @change="changeTheme"
    />
    <span style="margin-left: 8px;">Change SubMenu Theme</span>
    <br /><br />
    <div style="width: 256px;">
      <a-menu
        v-model:selectedKeys="selectedKeys"
        v-model:openKeys="openKeys"
        mode="vertical"
        theme="dark"
      >
        <a-sub-menu menu-key="sub1" title="Navigation One">
          <a-menu-item item-key="1">Option 1</a-menu-item>
          <a-menu-item item-key="2">Option 2</a-menu-item>
          <a-menu-item item-key="3">Option 3</a-menu-item>
        </a-sub-menu>
        <a-menu-item item-key="5">Option 5</a-menu-item>
        <a-menu-item item-key="6">Option 6</a-menu-item>
      </a-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedKeys = ref(['1'])
const openKeys = ref(['sub1'])
const currentTheme = ref<'light' | 'dark'>('light')

function changeTheme(checked: boolean) {
  currentTheme.value = checked ? 'dark' : 'light'
}
</script>
