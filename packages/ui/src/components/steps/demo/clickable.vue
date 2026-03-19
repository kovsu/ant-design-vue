<template>
  <div>
    <a-steps v-model:current="current">
      <a-step title="Step 1" description="This is a description." />
      <a-step title="Step 2" description="This is a description." />
      <a-step title="Step 3" description="This is a description." />
    </a-steps>
    <a-divider />
    <a-steps v-model:current="current" direction="vertical">
      <a-step title="Step 1" description="This is a description." />
      <a-step title="Step 2" description="This is a description." />
      <a-step title="Step 3" description="This is a description." />
    </a-steps>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const current = ref(0)
</script>
