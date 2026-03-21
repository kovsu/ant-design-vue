<script setup lang="ts">
import { ref } from 'vue'

const count = ref(5)
const show = ref(true)

function increase() {
  count.value++
}

function decline() {
  count.value = Math.max(0, count.value - 1)
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 24px;">
    <div style="display: flex; gap: 24px; align-items: center;">
      <a-badge :count="count">
        <div style="width: 42px; height: 42px; background: #ebebeb; border-radius: 6px;" />
      </a-badge>
      <a-button-group>
        <a-button @click="decline">-</a-button>
        <a-button @click="increase">+</a-button>
      </a-button-group>
    </div>
    <div style="display: flex; gap: 24px; align-items: center;">
      <a-badge :dot="show">
        <div style="width: 42px; height: 42px; background: #ebebeb; border-radius: 6px;" />
      </a-badge>
      <a-switch v-model:checked="show" />
    </div>
  </div>
</template>
