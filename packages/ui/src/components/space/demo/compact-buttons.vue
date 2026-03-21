<template>
  <a-space-compact>
    <a-tooltip title="Like">
      <a-button variant="outlined">Like</a-button>
    </a-tooltip>
    <a-tooltip title="Comment">
      <a-button variant="outlined">Comment</a-button>
    </a-tooltip>
    <a-tooltip title="Star">
      <a-button variant="outlined">Star</a-button>
    </a-tooltip>
    <a-dropdown>
      <a-button variant="outlined">More</a-button>
      <template #overlay>
        <a-menu>
          <a-menu-item item-key="1">Action 1</a-menu-item>
          <a-menu-item item-key="2">Action 2</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </a-space-compact>
</template>
