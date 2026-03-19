<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px; padding: 24px; background: #ececec;">
    <a-card title="With Border" :bordered="true">
      <p>Card content</p>
    </a-card>
    <a-card title="No Border" :bordered="false">
      <p>Card content</p>
    </a-card>
  </div>
</template>
