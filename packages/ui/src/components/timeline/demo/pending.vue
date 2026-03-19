<template>
  <div>
    <a-timeline pending="Recording..." :reverse="reverse">
      <a-timeline-item>Create a services site 2015-09-01</a-timeline-item>
      <a-timeline-item>Solve initial network problems 2015-09-01</a-timeline-item>
      <a-timeline-item>Technical testing 2015-09-01</a-timeline-item>
    </a-timeline>
    <a-button type="primary" style="margin-top: 16px;" @click="reverse = !reverse">
      Toggle Reverse
    </a-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const reverse = ref(false)
</script>
