<template>
  <div style="display: flex; gap: 24px; align-items: center;">
    <a-badge :count="5" title="Custom hover text">
      <div style="width: 42px; height: 42px; background: #ebebeb; border-radius: 6px;" />
    </a-badge>
    <a-badge :count="0" show-zero title="Zero items">
      <div style="width: 42px; height: 42px; background: #ebebeb; border-radius: 6px;" />
    </a-badge>
  </div>
</template>
