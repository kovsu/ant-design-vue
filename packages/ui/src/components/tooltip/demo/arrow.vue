<template>
  <div style="display: flex; gap: 16px; padding: 40px;">
    <a-tooltip title="With arrow" :arrow="true">
      <a-button>With arrow</a-button>
    </a-tooltip>
    <a-tooltip title="Without arrow" :arrow="false">
      <a-button>Without arrow</a-button>
    </a-tooltip>
  </div>
</template>
