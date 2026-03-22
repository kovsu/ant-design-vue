<template>
  <div style="padding: 40px;">
    <a-dropdown v-model:open="visible">
      <a @click.prevent>Hover me</a>
      <template #overlay>
        <a-menu @click="handleMenuClick">
          <a-menu-item item-key="1">Clicking me will not close the menu.</a-menu-item>
          <a-menu-item item-key="2">Clicking me will not close the menu also.</a-menu-item>
          <a-menu-item item-key="3">Clicking me will close the menu.</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)

function handleMenuClick(info: any) {
  if (info.key === '3') {
    visible.value = false
  }
}
</script>
