<script setup lang="ts">
import { ref, onMounted } from 'vue'

const container = ref<HTMLElement | null>(null)
const getTarget = () => container.value
</script>

<template>
  <div
    ref="container"
    style="height: 200px; overflow-y: auto; border: 1px solid #d9d9d9; border-radius: 6px; padding: 16px;"
  >
    <div style="height: 600px; padding-top: 60px;">
      <a-affix :target="getTarget" :offset-top="0">
        <a-button variant="solid">Fixed to container top</a-button>
      </a-affix>
    </div>
  </div>
</template>
