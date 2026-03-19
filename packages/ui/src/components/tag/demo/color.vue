<template>
  <div>
    <h4 style="margin-bottom: 8px;">Preset Colors</h4>
    <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px;">
      <a-tag v-for="c in presets" :key="c" :color="c">{{ c }}</a-tag>
    </div>
    <h4 style="margin-bottom: 8px;">Custom Colors</h4>
    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
      <a-tag color="#f50">#f50</a-tag>
      <a-tag color="#2db7f5">#2db7f5</a-tag>
      <a-tag color="#87d068">#87d068</a-tag>
      <a-tag color="#108ee9">#108ee9</a-tag>
    </div>
  </div>
</template>

<script setup lang="ts">
const presets = [
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple',
]
</script>
