<template>
  <div style="display: flex; gap: 16px; padding: 40px;">
    <a-dropdown :trigger="['click']">
      <a @click.prevent>Click me</a>
      <template #overlay>
        <a-menu>
          <a-menu-item item-key="1">1st menu item</a-menu-item>
          <a-menu-item item-key="2">2nd menu item</a-menu-item>
          <a-menu-item item-key="3">3rd menu item</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>
