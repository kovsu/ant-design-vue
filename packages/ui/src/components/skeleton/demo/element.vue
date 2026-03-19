<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div style="display: flex; gap: 16px; align-items: center;">
      <a-skeleton-button active />
      <a-skeleton-button active size="small" />
      <a-skeleton-button active size="large" />
      <a-skeleton-button active shape="circle" />
      <a-skeleton-button active shape="round" />
    </div>
    <div style="display: flex; gap: 16px; align-items: center;">
      <a-skeleton-avatar active />
      <a-skeleton-avatar active size="large" />
      <a-skeleton-avatar active shape="square" />
    </div>
    <div style="display: flex; gap: 16px;">
      <a-skeleton-input active />
      <a-skeleton-input active size="small" />
    </div>
    <a-skeleton-image active />
  </div>
</template>
