<template>
  <div>
    <a-steps v-model:current="current" type="navigation" size="small" :style="stepStyle">
      <a-step title="Step 1" sub-title="00:00:05" status="finish" description="This is a description." />
      <a-step title="Step 2" sub-title="00:01:02" status="process" description="This is a description." />
      <a-step title="Step 3" sub-title="waiting" status="wait" description="This is a description." />
    </a-steps>
    <a-steps v-model:current="current" type="navigation" :style="stepStyle">
      <a-step status="finish" title="Step 1" />
      <a-step status="process" title="Step 2" />
      <a-step status="wait" title="Step 3" />
      <a-step status="wait" title="Step 4" />
    </a-steps>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const current = ref(0)
const stepStyle = {
  marginBottom: '60px',
  boxShadow: '0px -1px 0 0 #e8e8e8 inset',
}
</script>
