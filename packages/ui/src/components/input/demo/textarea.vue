<template>
  <div style="display: flex; flex-direction: column; gap: 12px; max-width: 400px">
    <a-textarea placeholder="Basic textarea" :rows="4" />
    <a-textarea placeholder="Auto-resize textarea" :auto-size="{ minRows: 2, maxRows: 6 }" />
    <a-textarea placeholder="With count" :show-count="true" :maxlength="100" />
  </div>
</template>
