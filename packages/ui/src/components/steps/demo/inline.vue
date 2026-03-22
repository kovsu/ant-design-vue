<template>
  <div style="display: flex; flex-direction: column; gap: 24px">
    <div v-for="(item, index) in data" :key="index" style="display: flex; align-items: center; gap: 16px">
      <div style="min-width: 200px">
        <div style="font-weight: 500">{{ item.title }}</div>
        <div style="font-size: 12px; color: rgba(0, 0, 0, 0.45)">
          Ant Design, a design language for background applications
        </div>
      </div>
      <a-steps style="flex: 1" :current="item.current" :status="item.status" size="small">
        <a-step title="Step 1" description="This is a Step 1." />
        <a-step title="Step 2" description="This is a Step 2." />
        <a-step title="Step 3" description="This is a Step 3." />
      </a-steps>
    </div>
  </div>
</template>

<script setup lang="ts">
const data = [
  { title: 'Ant Design Title 1', current: 0 },
  { title: 'Ant Design Title 2', current: 1, status: 'error' as const },
  { title: 'Ant Design Title 3', current: 2 },
  { title: 'Ant Design Title 4', current: 1 },
]
</script>
