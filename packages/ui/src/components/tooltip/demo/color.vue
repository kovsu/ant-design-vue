<template>
  <div style="display: flex; flex-direction: column; gap: 16px; padding: 40px;">
    <h4 style="margin: 0;">Preset colors</h4>
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <a-tooltip v-for="c in presetColors" :key="c" :title="`${c} prompt text`" :color="c">
        <a-button>{{ c }}</a-button>
      </a-tooltip>
    </div>
    <h4 style="margin: 0;">Custom color</h4>
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <a-tooltip title="Custom color #f50" color="#f50">
        <a-button>#f50</a-button>
      </a-tooltip>
      <a-tooltip title="Custom color #2db7f5" color="#2db7f5">
        <a-button>#2db7f5</a-button>
      </a-tooltip>
      <a-tooltip title="Custom color #87d068" color="#87d068">
        <a-button>#87d068</a-button>
      </a-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
const presetColors = [
  'pink', 'red', 'yellow', 'orange', 'cyan', 'green',
  'blue', 'purple', 'geekblue', 'magenta', 'volcano', 'gold', 'lime',
]
</script>
