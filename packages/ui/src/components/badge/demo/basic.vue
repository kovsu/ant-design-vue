<template>
  <div style="display: flex; gap: 24px; align-items: center;">
    <a-badge :count="5">
      <div style="width: 42px; height: 42px; background: #ebebeb; border-radius: 6px;" />
    </a-badge>
    <a-badge :count="0" show-zero>
      <div style="width: 42px; height: 42px; background: #ebebeb; border-radius: 6px;" />
    </a-badge>
    <a-badge>
      <template #count>
        <span style="color: #f5222d; font-size: 16px;">&#9993;</span>
      </template>
      <div style="width: 42px; height: 42px; background: #ebebeb; border-radius: 6px;" />
    </a-badge>
  </div>
</template>
