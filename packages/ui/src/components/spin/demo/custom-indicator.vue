<template>
  <a-spin>
    <template #indicator>
      <span class="custom-spinner" />
    </template>
  </a-spin>
</template>

<style scoped>
.custom-spinner {
  display: inline-block;
  width: 24px;
  height: 24px;
  border: 3px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.75s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
