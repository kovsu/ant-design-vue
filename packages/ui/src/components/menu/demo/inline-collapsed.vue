<template>
  <div>
    <a-button type="primary" style="margin-bottom: 16px;" @click="collapsed = !collapsed">
      {{ collapsed ? 'Expand' : 'Collapse' }}
    </a-button>
    <div style="width: 256px;">
      <a-menu
        v-model:selected-keys="selectedKeys"
        v-model:open-keys="openKeys"
        mode="inline"
        :inline-collapsed="collapsed"
      >
        <a-menu-item item-key="1">Option 1</a-menu-item>
        <a-menu-item item-key="2">Option 2</a-menu-item>
        <a-sub-menu menu-key="sub1" title="Navigation One">
          <a-menu-item item-key="3">Option 3</a-menu-item>
          <a-menu-item item-key="4">Option 4</a-menu-item>
        </a-sub-menu>
        <a-sub-menu menu-key="sub2" title="Navigation Two">
          <a-menu-item item-key="5">Option 5</a-menu-item>
          <a-menu-item item-key="6">Option 6</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedKeys = ref(['1'])
const openKeys = ref<string[]>([])
const collapsed = ref(false)
</script>
