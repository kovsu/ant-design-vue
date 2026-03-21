<script setup lang="ts">
import { ref, computed } from 'vue'

const colCount = ref(4)
const gutterH = ref(16)
const gutterV = ref(16)

const colSpan = computed(() => Math.floor(24 / colCount.value))
const cols = computed(() => Array.from({ length: colCount.value }, (_, i) => i))
</script>

<template>
  <div>
    <div style="margin-bottom: 16px;">
      <span>Columns: </span>
      <a-slider v-model:value="colCount" :min="1" :max="12" style="max-width: 300px;" />
    </div>
    <div style="margin-bottom: 16px;">
      <span>Horizontal Gutter: </span>
      <a-slider v-model:value="gutterH" :min="0" :max="48" :step="8" style="max-width: 300px;" />
    </div>
    <div style="margin-bottom: 16px;">
      <span>Vertical Gutter: </span>
      <a-slider v-model:value="gutterV" :min="0" :max="48" :step="8" style="max-width: 300px;" />
    </div>
    <a-row :gutter="[gutterH, gutterV]">
      <a-col v-for="i in cols" :key="i" :span="colSpan">
        <div class="demo-col" :class="{ light: i % 2 !== 0 }">col-{{ colSpan }}</div>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped>
.demo-col {
  background: #1677ff;
  color: #fff;
  text-align: center;
  padding: 16px 0;
}
.demo-col.light {
  background: #1677ffbf;
}
</style>
