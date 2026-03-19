<template>
  <div style="display: flex; gap: 48px;">
    <a-statistic-countdown title="Countdown" :value="deadline" />
    <a-statistic-countdown title="Day Level" :value="deadline" format="D 天 H 时 m 分 s 秒" />
  </div>
</template>

<script setup>
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30
</script>
