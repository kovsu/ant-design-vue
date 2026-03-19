<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
    <a-progress :percent="99.9" :stroke-color="['#108ee9', '#87d068']" />
    <a-progress :percent="99.9" :stroke-color="{ from: '#108ee9', to: '#87d068' }" />
  </div>
</template>
