<template>
  <div style="display: flex; flex-direction: column; gap: 24px;">
    <div style="max-width: 400px; display: flex; flex-direction: column; gap: 8px;">
      <a-progress :percent="50" />
      <a-progress :percent="50" size="small" />
      <a-progress :percent="50" :size="[300, 20]" />
    </div>
    <div style="display: flex; gap: 24px; align-items: center;">
      <a-progress type="circle" :percent="50" />
      <a-progress type="circle" :percent="50" size="small" />
      <a-progress type="circle" :percent="50" :size="20" />
    </div>
  </div>
</template>
