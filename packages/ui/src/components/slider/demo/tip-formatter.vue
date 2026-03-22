<script setup lang="ts">
const formatter = (value: number) => {
  return `${value}%`
}
</script>

<template>
  <div style="max-width: 400px">
    <p>Custom tip formatter (value + %):</p>
    <a-slider :tip-formatter="formatter" />
    <p style="margin-top: 16px">Tooltip hidden (tip-formatter=null):</p>
    <a-slider :tip-formatter="null" />
  </div>
</template>
