<template>
  <div style="display: flex; flex-direction: column; gap: 32px">
    <a-statistic-countdown :value="deadline" @finish="onFinish">
      <template #title>
        <span>Countdown</span>
      </template>
    </a-statistic-countdown>

    <a-statistic-countdown
      title="Milliseconds countdown"
      :value="deadline"
      format="HH:mm:ss:SSS"
    >
      <template #prefix>
        <span>There's only </span>
      </template>
      <template #suffix>
        <span> left for the end.</span>
      </template>
    </a-statistic-countdown>
  </div>
</template>

<script setup lang="ts">
const onFinish = () => {
  console.log('finished!')
}

const deadline = Date.now() + 1000 * 60 * 60 * 20 * 2
</script>
