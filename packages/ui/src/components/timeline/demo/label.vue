<script setup lang="ts">
import { ref } from 'vue'

const mode = ref<'left' | 'right' | 'alternate'>('left')
</script>

<template>
  <div>
    <a-radio-group v-model:value="mode" style="margin-bottom: 20px;">
      <a-radio value="left">Left</a-radio>
      <a-radio value="right">Right</a-radio>
      <a-radio value="alternate">Alternate</a-radio>
    </a-radio-group>

    <a-timeline :mode="mode">
      <a-timeline-item label="2015-09-01">Create a services site</a-timeline-item>
      <a-timeline-item label="2015-09-01 09:12:11">Solve initial network problems</a-timeline-item>
      <a-timeline-item>Technical testing</a-timeline-item>
      <a-timeline-item label="2015-09-01 09:12:11">Network problems being solved</a-timeline-item>
    </a-timeline>
  </div>
</template>
