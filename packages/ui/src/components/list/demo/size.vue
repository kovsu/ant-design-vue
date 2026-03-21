<script setup lang="ts">
const data = ['Item 1', 'Item 2', 'Item 3']
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 24px;">
    <div>
      <h4>Small</h4>
      <a-list bordered :data-source="data" size="sm">
        <template #header>Header</template>
        <template #renderItem="{ item }">
          <a-list-item>{{ item }}</a-list-item>
        </template>
      </a-list>
    </div>
    <div>
      <h4>Default (Medium)</h4>
      <a-list bordered :data-source="data" size="md">
        <template #header>Header</template>
        <template #renderItem="{ item }">
          <a-list-item>{{ item }}</a-list-item>
        </template>
      </a-list>
    </div>
    <div>
      <h4>Large</h4>
      <a-list bordered :data-source="data" size="lg">
        <template #header>Header</template>
        <template #renderItem="{ item }">
          <a-list-item>{{ item }}</a-list-item>
        </template>
      </a-list>
    </div>
  </div>
</template>
