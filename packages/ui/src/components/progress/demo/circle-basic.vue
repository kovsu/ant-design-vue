<template>
  <div style="display: flex; gap: 24px; align-items: center;">
    <a-progress type="circle" :percent="75" />
    <a-progress type="circle" :percent="70" status="exception" />
    <a-progress type="circle" :percent="100" />
  </div>
</template>
