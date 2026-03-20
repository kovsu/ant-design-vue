<template>
  <div style="display: flex; flex-wrap: wrap; gap: 8px; padding: 40px;">
    <a-dropdown-button @click="handleButtonClick">
      Dropdown
      <template #overlay>
        <a-menu @click="handleMenuClick">
          <a-menu-item item-key="1">1st menu item</a-menu-item>
          <a-menu-item item-key="2">2nd menu item</a-menu-item>
          <a-menu-item item-key="3">3rd menu item</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown-button>

    <a-dropdown-button type="primary">
      Primary
      <template #overlay>
        <a-menu>
          <a-menu-item item-key="1">1st item</a-menu-item>
          <a-menu-item item-key="2">2nd item</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown-button>

    <a-dropdown-button disabled>
      Disabled
      <template #overlay>
        <a-menu>
          <a-menu-item item-key="1">1st item</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown-button>

    <a-dropdown-button danger>
      Danger
      <template #overlay>
        <a-menu>
          <a-menu-item item-key="1" danger>Delete</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown-button>
  </div>
</template>

<script setup lang="ts">
function handleButtonClick() {
  console.log('button clicked')
}

function handleMenuClick(info: any) {
  console.log('menu item clicked:', info)
}
</script>
