<template>
  <div style="display: flex; gap: 16px; padding: 40px;">
    <a-tooltip placement="topLeft" title="Prompt Text">
      <a-button>Align edge</a-button>
    </a-tooltip>
    <a-tooltip placement="topLeft" title="Prompt Text" :arrow="{ pointAtCenter: true }">
      <a-button>Arrow points to center</a-button>
    </a-tooltip>
  </div>
</template>
