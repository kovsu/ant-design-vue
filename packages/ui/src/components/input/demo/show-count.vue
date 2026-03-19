<template>
  <div style="display: flex; flex-direction: column; gap: 12px; max-width: 400px">
    <a-input placeholder="With count" :show-count="true" :maxlength="20" />
    <a-input placeholder="Count without max" :show-count="true" />
    <a-textarea placeholder="TextArea with count" :show-count="true" :maxlength="200" :rows="4" />
  </div>
</template>
