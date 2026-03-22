<template>
  <div>
    <div style="display: flex; gap: 8px; margin-bottom: 16px">
      <a-button @click="decline">
        Smaller
      </a-button>
      <a-button @click="increase">
        Larger
      </a-button>
    </div>
    <a-q-r-code
      :size="size"
      :icon-size="size / 4"
      error-level="H"
      value="https://ant-design-vue.com"
      icon="https://www.antdv.com/assets/logo.1ef800a8.svg"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const size = ref(160)

const decline = () => {
  size.value = Math.max(48, size.value - 10)
}

const increase = () => {
  size.value = Math.min(300, size.value + 10)
}
</script>
