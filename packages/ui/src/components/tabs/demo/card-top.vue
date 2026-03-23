<template>
  <div class="card-container">
    <a-tabs v-model:active-key="activeKey" type="card">
      <a-tab-pane key="1" tab="Tab Title 1">
        <p>Content of Tab Pane 1</p>
        <p>Content of Tab Pane 1</p>
        <p>Content of Tab Pane 1</p>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Tab Title 2">
        <p>Content of Tab Pane 2</p>
        <p>Content of Tab Pane 2</p>
        <p>Content of Tab Pane 2</p>
      </a-tab-pane>
      <a-tab-pane key="3" tab="Tab Title 3">
        <p>Content of Tab Pane 3</p>
        <p>Content of Tab Pane 3</p>
        <p>Content of Tab Pane 3</p>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const activeKey = ref('2')
</script>

<style scoped>
.card-container p {
  margin: 0;
}
.card-container :deep(.ant-tabs-card .ant-tabs-content) {
  height: 120px;
  margin-top: -16px;
}
.card-container :deep(.ant-tabs-card .ant-tabs-content > .ant-tabs-tabpane) {
  padding: 16px;
  background: #fff;
}
.card-container :deep(.ant-tabs-card > .ant-tabs-nav::before) {
  display: none;
}
.card-container :deep(.ant-tabs-card .ant-tabs-tab) {
  background: transparent;
  border-color: transparent;
}
.card-container :deep(.ant-tabs-card .ant-tabs-tab-active) {
  background: #fff;
  border-color: #fff;
}
</style>
