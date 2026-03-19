<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div style="max-width: 200px;">
      <a-progress :percent="30" size="small" />
      <a-progress :percent="50" size="small" status="active" />
      <a-progress :percent="70" size="small" status="exception" />
      <a-progress :percent="100" size="small" />
    </div>
    <div style="display: flex; gap: 12px;">
      <a-progress type="circle" :percent="30" :size="80" />
      <a-progress type="circle" :percent="70" :size="80" status="exception" />
      <a-progress type="circle" :percent="100" :size="80" />
    </div>
  </div>
</template>
