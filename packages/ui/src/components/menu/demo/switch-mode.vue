<template>
  <div>
    <div style="margin-bottom: 16px;">
      <a-switch :checked="mode === 'vertical'" @change="changeMode" />
      <span style="margin-left: 8px;">Change Mode</span>
      <span style="display: inline-block; width: 1px; height: 14px; background: #d9d9d9; margin: 0 16px; vertical-align: middle;" />
      <a-switch :checked="theme === 'dark'" @change="changeTheme" />
      <span style="margin-left: 8px;">Change Theme</span>
    </div>
    <div style="width: 256px;">
      <a-menu
        v-model:selected-keys="selectedKeys"
        v-model:open-keys="openKeys"
        :mode="mode"
        :theme="theme"
      >
        <a-menu-item item-key="1">Navigation One</a-menu-item>
        <a-menu-item item-key="2">Navigation Two</a-menu-item>
        <a-sub-menu menu-key="sub1" title="Navigation Three">
          <a-menu-item item-key="3">Option 3</a-menu-item>
          <a-menu-item item-key="4">Option 4</a-menu-item>
          <a-sub-menu menu-key="sub1-2" title="Submenu">
            <a-menu-item item-key="5">Option 5</a-menu-item>
            <a-menu-item item-key="6">Option 6</a-menu-item>
          </a-sub-menu>
        </a-sub-menu>
        <a-sub-menu menu-key="sub2" title="Navigation Four">
          <a-menu-item item-key="7">Option 7</a-menu-item>
          <a-menu-item item-key="8">Option 8</a-menu-item>
          <a-menu-item item-key="9">Option 9</a-menu-item>
          <a-menu-item item-key="10">Option 10</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type MenuMode = 'inline' | 'vertical'
type MenuTheme = 'light' | 'dark'

const mode = ref<MenuMode>('inline')
const theme = ref<MenuTheme>('light')
const selectedKeys = ref(['1'])
const openKeys = ref(['sub1'])

function changeMode(checked: boolean) {
  mode.value = checked ? 'vertical' : 'inline'
}

function changeTheme(checked: boolean) {
  theme.value = checked ? 'dark' : 'light'
}
</script>
