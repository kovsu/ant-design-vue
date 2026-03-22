<template>
  <div style="display: flex; flex-direction: column; gap: 24px;">
    <a-tooltip title="3 done / 3 in progress / 4 to do">
      <div style="max-width: 400px;">
        <a-progress :percent="60" :success="{ percent: 30 }" />
      </div>
    </a-tooltip>
    <div style="display: flex; gap: 24px; align-items: center;">
      <a-tooltip title="3 done / 3 in progress / 4 to do">
        <a-progress :percent="60" :success="{ percent: 30 }" type="circle" />
      </a-tooltip>
      <a-tooltip title="3 done / 3 in progress / 4 to do">
        <a-progress :percent="60" :success="{ percent: 30 }" type="dashboard" />
      </a-tooltip>
    </div>
  </div>
</template>
