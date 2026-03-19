<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div style="max-width: 400px;">
      <a-progress :percent="60" :success="{ percent: 30 }" />
    </div>
    <div style="display: flex; gap: 24px; align-items: center;">
      <a-progress :percent="60" :success="{ percent: 30 }" type="circle" />
      <a-progress :percent="60" :success="{ percent: 30 }" type="dashboard" />
    </div>
  </div>
</template>
