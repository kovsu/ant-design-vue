<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)

const listData = [
  { title: 'Ant Design Vue', description: 'An enterprise-class UI components based on Ant Design and Vue.' },
  { title: 'Design Language', description: 'A design language for background applications.' },
  { title: 'Component Library', description: 'A set of high-quality Vue components out of the box.' },
]
</script>

<template>
  <div>
    <div style="margin-bottom: 16px;">
      <a-switch v-model:checked="loading" />
      <span style="margin-left: 8px;">Loading</span>
    </div>
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div v-for="(item, index) in listData" :key="index" style="padding: 16px; border: 1px solid #f0f0f0; border-radius: 8px;">
        <a-skeleton :loading="loading" active avatar :paragraph="{ rows: 2 }">
          <div style="display: flex; gap: 16px; align-items: center;">
            <div style="width: 40px; height: 40px; border-radius: 50%; background: #1677ff; flex-shrink: 0;" />
            <div>
              <h4 style="margin: 0 0 8px;">{{ item.title }}</h4>
              <p style="margin: 0; color: #666;">{{ item.description }}</p>
            </div>
          </div>
        </a-skeleton>
      </div>
    </div>
  </div>
</template>
