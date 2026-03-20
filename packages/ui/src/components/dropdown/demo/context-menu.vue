<template>
  <div style="padding: 40px;">
    <a-dropdown :trigger="['contextmenu']">
      <div
        style="
          width: 300px;
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-neutral-bg-hover, #f5f5f5);
          border-radius: 8px;
          color: var(--color-neutral-secondary);
          user-select: none;
        "
      >
        Right Click on here
      </div>
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
