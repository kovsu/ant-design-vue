<template>
  <div style="display: flex; flex-wrap: wrap; gap: 8px; padding: 40px;">
    <a-dropdown :arrow="true" placement="bottomLeft">
      <a-button>bottomLeft</a-button>
      <template #overlay>
        <a-menu>
          <a-menu-item item-key="1">1st item</a-menu-item>
          <a-menu-item item-key="2">2nd item</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>

    <a-dropdown :arrow="true" placement="bottomCenter">
      <a-button>bottomCenter</a-button>
      <template #overlay>
        <a-menu>
          <a-menu-item item-key="1">1st item</a-menu-item>
          <a-menu-item item-key="2">2nd item</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>

    <a-dropdown :arrow="true" placement="bottomRight">
      <a-button>bottomRight</a-button>
      <template #overlay>
        <a-menu>
          <a-menu-item item-key="1">1st item</a-menu-item>
          <a-menu-item item-key="2">2nd item</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>
