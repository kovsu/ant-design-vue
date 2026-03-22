<template>
  <div style="padding: 40px;">
    <a-dropdown>
      <a @click.prevent>Hover me, Click menu item</a>
      <template #overlay>
        <a-menu @click="onClick">
          <a-menu-item item-key="1">1st menu item</a-menu-item>
          <a-menu-item item-key="2">2nd menu item</a-menu-item>
          <a-menu-item item-key="3">3rd menu item</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script setup lang="ts">
function onClick(info: any) {
  console.log(`Click on item ${info.key}`)
}
</script>
