<template>
  <div style="padding: 40px;">
    <a-dropdown>
      <a @click.prevent>Cascading menu</a>
      <template #overlay>
        <a-menu>
          <a-menu-item item-key="1">1st menu item</a-menu-item>
          <a-menu-item item-key="2">2nd menu item</a-menu-item>
          <a-sub-menu item-key="sub1" title="sub menu">
            <a-menu-item item-key="3">3rd menu item</a-menu-item>
            <a-menu-item item-key="4">4th menu item</a-menu-item>
          </a-sub-menu>
          <a-sub-menu item-key="sub2" title="disabled sub menu" disabled>
            <a-menu-item item-key="5">5th menu item</a-menu-item>
            <a-menu-item item-key="6">6th menu item</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>
