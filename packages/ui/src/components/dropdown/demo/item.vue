<template>
  <div style="padding: 40px;">
    <a-dropdown>
      <a @click.prevent>Hover me</a>
      <template #overlay>
        <a-menu>
          <a-menu-item item-key="0">
            <a target="_blank" rel="noopener noreferrer" href="https://www.antdv.com/">
              1st menu item
            </a>
          </a-menu-item>
          <a-menu-item item-key="1">
            <a target="_blank" rel="noopener noreferrer" href="https://www.antdv.com/">
              2nd menu item
            </a>
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item item-key="3" disabled>3rd menu item (disabled)</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>
