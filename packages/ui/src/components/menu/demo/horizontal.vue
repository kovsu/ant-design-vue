<template>
  <div>
    <a-menu v-model:selected-keys="current" mode="horizontal">
      <a-menu-item item-key="mail">Navigation One</a-menu-item>
      <a-menu-item item-key="app">Navigation Two</a-menu-item>
      <a-sub-menu menu-key="sub1" title="Navigation Three - Submenu">
        <a-menu-item-group title="Item 1">
          <a-menu-item item-key="setting:1">Option 1</a-menu-item>
          <a-menu-item item-key="setting:2">Option 2</a-menu-item>
        </a-menu-item-group>
        <a-menu-item-group title="Item 2">
          <a-menu-item item-key="setting:3">Option 3</a-menu-item>
          <a-menu-item item-key="setting:4">Option 4</a-menu-item>
        </a-menu-item-group>
      </a-sub-menu>
      <a-menu-item item-key="link">
        <a href="https://antdv.com" target="_blank">Navigation Four - Link</a>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const current = ref(['mail'])
</script>
