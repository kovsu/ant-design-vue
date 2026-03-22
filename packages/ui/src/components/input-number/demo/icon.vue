<script setup lang="ts">
import { ref } from 'vue'

const value = ref(3)
</script>

<template>
  <div>
    <a-input-number v-model:value="value" :min="1" :max="10">
      <template #upIcon>
        <span style="font-size: 10px">&#9650;</span>
      </template>
      <template #downIcon>
        <span style="font-size: 10px">&#9660;</span>
      </template>
    </a-input-number>
  </div>
</template>
