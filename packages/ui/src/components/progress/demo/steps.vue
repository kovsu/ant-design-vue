<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
    <a-progress :percent="50" :steps="3" />
    <a-progress :percent="30" :steps="5" />
    <a-progress :percent="100" :steps="5" size="small" stroke-color="#52c41a" />
  </div>
</template>
