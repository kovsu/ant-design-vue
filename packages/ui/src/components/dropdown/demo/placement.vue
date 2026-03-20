<template>
  <div style="display: flex; flex-wrap: wrap; gap: 8px; padding: 40px;">
    <a-dropdown placement="bottomLeft">
      <a-button>bottomLeft</a-button>
      <template #overlay>
        <a-menu>
          <a-menu-item item-key="1">1st item</a-menu-item>
          <a-menu-item item-key="2">2nd item</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>

    <a-dropdown placement="bottomCenter">
      <a-button>bottomCenter</a-button>
      <template #overlay>
        <a-menu>
          <a-menu-item item-key="1">1st item</a-menu-item>
          <a-menu-item item-key="2">2nd item</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>

    <a-dropdown placement="bottomRight">
      <a-button>bottomRight</a-button>
      <template #overlay>
        <a-menu>
          <a-menu-item item-key="1">1st item</a-menu-item>
          <a-menu-item item-key="2">2nd item</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>

    <a-dropdown placement="topLeft">
      <a-button>topLeft</a-button>
      <template #overlay>
        <a-menu>
          <a-menu-item item-key="1">1st item</a-menu-item>
          <a-menu-item item-key="2">2nd item</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>

    <a-dropdown placement="topCenter">
      <a-button>topCenter</a-button>
      <template #overlay>
        <a-menu>
          <a-menu-item item-key="1">1st item</a-menu-item>
          <a-menu-item item-key="2">2nd item</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>

    <a-dropdown placement="topRight">
      <a-button>topRight</a-button>
      <template #overlay>
        <a-menu>
          <a-menu-item item-key="1">1st item</a-menu-item>
          <a-menu-item item-key="2">2nd item</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>
