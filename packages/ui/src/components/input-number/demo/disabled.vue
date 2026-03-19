<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <a-input-number :disabled="true" :default-value="3" />
    <a-input-number :readonly="true" :default-value="5" />
  </div>
</template>
