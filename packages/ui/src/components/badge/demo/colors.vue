<template>
  <div>
    <h4>Presets</h4>
    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
      <a-badge v-for="c in presets" :key="c" :color="c" :text="c" />
    </div>
    <h4 style="margin-top: 16px;">Custom</h4>
    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
      <a-badge color="#f50" text="#f50" />
      <a-badge color="#2db7f5" text="#2db7f5" />
      <a-badge color="#87d068" text="#87d068" />
    </div>
  </div>
</template>
<script setup>
const presets = ['pink', 'red', 'yellow', 'orange', 'cyan', 'green', 'blue', 'purple', 'geekblue', 'magenta', 'volcano', 'gold', 'lime']
</script>
