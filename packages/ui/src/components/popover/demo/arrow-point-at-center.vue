<template>
  <div style="display: flex; gap: 16px; padding: 40px;">
    <a-popover placement="topLeft" title="Title">
      <template #content>
        <p style="margin: 0;">Content</p>
        <p style="margin: 0;">Content</p>
      </template>
      <a-button>Align edge</a-button>
    </a-popover>
    <a-popover placement="topLeft" :arrow="{ pointAtCenter: true }" title="Title">
      <template #content>
        <p style="margin: 0;">Content</p>
        <p style="margin: 0;">Content</p>
      </template>
      <a-button>Arrow points to center</a-button>
    </a-popover>
  </div>
</template>
