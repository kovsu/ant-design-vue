<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <a-input-number placeholder="Enter number" :min="1" :max="10" :default-value="3" />
    <a-input-number placeholder="With step" :step="0.1" :min="0" :max="1" />
  </div>
</template>
