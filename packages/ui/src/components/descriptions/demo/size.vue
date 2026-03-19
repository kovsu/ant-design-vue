<script setup lang="ts">
import { ref } from 'vue'

const size = ref<'default' | 'middle' | 'small'>('default')
</script>

<template>
  <div>
    <div style="margin-bottom: 16px;">
      <span style="margin-right: 8px;">Size:</span>
      <label style="margin-right: 8px;">
        <input v-model="size" type="radio" value="default" /> Default
      </label>
      <label style="margin-right: 8px;">
        <input v-model="size" type="radio" value="middle" /> Middle
      </label>
      <label>
        <input v-model="size" type="radio" value="small" /> Small
      </label>
    </div>
    <a-descriptions title="Custom Size" bordered :size="size">
      <a-descriptions-item label="Product">Cloud Database</a-descriptions-item>
      <a-descriptions-item label="Billing">Prepaid</a-descriptions-item>
      <a-descriptions-item label="Time">18:00:00</a-descriptions-item>
      <a-descriptions-item label="Amount">$80.00</a-descriptions-item>
      <a-descriptions-item label="Discount">$20.00</a-descriptions-item>
      <a-descriptions-item label="Official">$60.00</a-descriptions-item>
    </a-descriptions>
  </div>
</template>
