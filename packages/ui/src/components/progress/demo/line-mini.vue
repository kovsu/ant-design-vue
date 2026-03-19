<template>
  <div style="width: 170px; display: flex; flex-direction: column; gap: 8px;">
    <a-progress :percent="30" size="small" />
    <a-progress :percent="50" size="small" status="active" />
    <a-progress :percent="70" size="small" status="exception" />
    <a-progress :percent="100" size="small" />
  </div>
</template>
