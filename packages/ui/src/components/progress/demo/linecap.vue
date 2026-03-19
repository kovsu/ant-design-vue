<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div style="max-width: 400px;">
      <a-progress stroke-linecap="square" :percent="75" />
    </div>
    <div style="display: flex; gap: 24px; align-items: center;">
      <a-progress stroke-linecap="square" :percent="75" type="circle" />
      <a-progress stroke-linecap="round" :percent="75" type="circle" />
    </div>
  </div>
</template>
