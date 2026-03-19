<template>
  <div>
    <a-steps v-model:current="current" :percent="60">
      <a-step title="Finished" description="This is a description." />
      <a-step title="In Progress" sub-title="Left 00:00:08" description="This is a description." />
      <a-step title="Waiting" description="This is a description." />
    </a-steps>
    <br />
    <a-steps v-model:current="current" :percent="60" size="small">
      <a-step title="Finished" description="This is a description." />
      <a-step title="In Progress" sub-title="Left 00:00:08" description="This is a description." />
      <a-step title="Waiting" description="This is a description." />
    </a-steps>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const current = ref(1)
</script>
