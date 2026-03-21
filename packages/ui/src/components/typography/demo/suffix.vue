<script setup lang="ts">
import { ref } from 'vue'

const rows = ref(1)
const longText =
  'Ant Design, a design language for background applications, is refined by Ant UED Team. ' +
  'Ant Design, a design language for background applications, is refined by Ant UED Team. ' +
  'Ant Design, a design language for background applications, is refined by Ant UED Team.'
const suffix = '...read more'
</script>

<template>
  <div style="max-width: 400px;">
    <div style="margin-bottom: 16px;">
      <span>Rows: {{ rows }}</span>
      <a-slider v-model:value="rows" :min="1" :max="10" />
    </div>

    <a-typography-paragraph :ellipsis="{ rows, suffix }">
      {{ longText }}
    </a-typography-paragraph>
  </div>
</template>
