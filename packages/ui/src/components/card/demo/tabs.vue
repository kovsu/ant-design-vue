<template>
  <div style="max-width: 500px">
    <a-card title="Card with Tabs">
      <template #extra>
        <a href="#">More</a>
      </template>
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="article" tab="Article">
          <p>Article content</p>
        </a-tab-pane>
        <a-tab-pane key="app" tab="App">
          <p>App content</p>
        </a-tab-pane>
        <a-tab-pane key="project" tab="Project">
          <p>Project content</p>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const activeKey = ref('article')
</script>
