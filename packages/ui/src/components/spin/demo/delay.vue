<template>
  <div>
    <a-spin :spinning="loading" :delay="500">
      <div style="padding: 50px; background: rgba(0,0,0,0.05); border-radius: 4px;">
        Content that can load
      </div>
    </a-spin>
    <div style="margin-top: 16px;">
      <label><input v-model="loading" type="checkbox" /> Toggle loading (500ms delay)</label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
</script>
