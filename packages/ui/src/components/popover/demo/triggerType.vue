<template>
  <div style="display: flex; gap: 8px; padding: 40px;">
    <a-popover title="Title" trigger="hover">
      <template #content>
        <p style="margin: 0;">Content</p>
        <p style="margin: 0;">Content</p>
      </template>
      <a-button>Hover me</a-button>
    </a-popover>
    <a-popover title="Title" trigger="focus">
      <template #content>
        <p style="margin: 0;">Content</p>
        <p style="margin: 0;">Content</p>
      </template>
      <a-button>Focus me</a-button>
    </a-popover>
    <a-popover title="Title" trigger="click">
      <template #content>
        <p style="margin: 0;">Content</p>
        <p style="margin: 0;">Content</p>
      </template>
      <a-button>Click me</a-button>
    </a-popover>
  </div>
</template>
