<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
    <a-progress :percent="30" />
    <a-progress :percent="50" status="active" />
    <a-progress :percent="70" status="exception" />
    <a-progress :percent="100" />
  </div>
</template>
