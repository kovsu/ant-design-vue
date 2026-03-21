<template>
  <div style="display: flex; flex-wrap: wrap; gap: 8px">
    <a-dropdown-button type="primary" @click="handleClick">
      Save
      <template #overlay>
        <a-menu @click="handleMenuClick">
          <a-menu-item item-key="save-as">Save As</a-menu-item>
          <a-menu-item item-key="save-draft">Save as Draft</a-menu-item>
          <a-menu-divider />
          <a-menu-item item-key="save-template">Save as Template</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown-button>

    <a-dropdown-button>
      Actions
      <template #overlay>
        <a-menu>
          <a-menu-item item-key="copy">Copy</a-menu-item>
          <a-menu-item item-key="move">Move</a-menu-item>
          <a-menu-item item-key="delete" danger>Delete</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown-button>

    <a-dropdown-button disabled>
      Disabled
      <template #overlay>
        <a-menu>
          <a-menu-item item-key="1">Item 1</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown-button>
  </div>
</template>

<script setup lang="ts">
function handleClick() {
  console.log('Save button clicked')
}

function handleMenuClick(info: any) {
  console.log('Menu item clicked:', info)
}
</script>
