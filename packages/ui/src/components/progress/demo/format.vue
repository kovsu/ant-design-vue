<template>
  <div style="display: flex; gap: 24px; align-items: center;">
    <a-progress type="circle" :percent="75" :format="(p: number) => `${p} Days`" />
    <a-progress type="circle" :percent="100" :format="() => 'Done'" />
  </div>
</template>
