<template>
  <div style="display: flex; align-items: center; gap: 8px;">
    <a-progress
      type="circle"
      trail-color="#e6f4ff"
      :percent="60"
      :size="14"
      :format="(p: number) => `In progress, ${p}% done`"
    />
    <span>Code deploy</span>
  </div>
</template>
