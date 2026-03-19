<template>
  <div>
    <a-steps :current="current">
      <a-step title="First" />
      <a-step title="Second" />
      <a-step title="Last" />
    </a-steps>
    <div class="steps-content">
      {{ steps[current].content }}
    </div>
    <div class="steps-action">
      <a-button v-if="current < steps.length - 1" type="primary" @click="next">Next</a-button>
      <a-button v-if="current === steps.length - 1" type="primary" @click="onDone">Done</a-button>
      <a-button v-if="current > 0" style="margin-left: 8px;" @click="prev">Previous</a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const current = ref(0)

const steps = [
  { title: 'First', content: 'First-content' },
  { title: 'Second', content: 'Second-content' },
  { title: 'Last', content: 'Last-content' },
]

const next = () => {
  current.value++
}

const prev = () => {
  current.value--
}

const onDone = () => {
  // Processing complete
}
</script>

<style scoped>
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}
.steps-action {
  margin-top: 24px;
}
</style>
