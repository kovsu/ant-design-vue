<template>
  <div style="display: flex; flex-wrap: wrap; gap: 8px; padding: 40px;">
    <template v-for="placement in placements" :key="placement">
      <a-dropdown :placement="placement" :arrow="{ pointAtCenter: true }">
        <a-button>{{ placement }}</a-button>
        <template #overlay>
          <a-menu>
            <a-menu-item item-key="1">1st menu item</a-menu-item>
            <a-menu-item item-key="2">2nd menu item</a-menu-item>
            <a-menu-item item-key="3">3rd menu item</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </template>
  </div>
</template>

<script setup lang="ts">
const placements = ['topLeft', 'top', 'topRight', 'bottomLeft', 'bottom', 'bottomRight'] as const
</script>
