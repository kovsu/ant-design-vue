<template>
  <div>
    <a-progress type="circle" :percent="percent" />
    <div style="margin-top: 16px; display: flex; gap: 8px;">
      <a-button @click="decline">-</a-button>
      <a-button @click="increase">+</a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const percent = ref(0)

const increase = () => {
  const val = percent.value + 10
  percent.value = val > 100 ? 100 : val
}

const decline = () => {
  const val = percent.value - 10
  percent.value = val < 0 ? 0 : val
}
</script>
