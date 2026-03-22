<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref(30)
const value2 = ref<[number, number]>([20, 50])
const reverse = ref(true)
</script>

<template>
  <div style="max-width: 400px">
    <a-slider v-model:value="value1" :reverse="reverse" />
    <a-slider v-model:value="value2" range :reverse="reverse" />
    <div style="margin-top: 16px">
      Reversed:
      <input type="checkbox" v-model="reverse" />
    </div>
  </div>
</template>
