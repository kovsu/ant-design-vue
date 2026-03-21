<template>
  <div class="demo-block">
    <div class="demo-block-header">
      <span class="demo-block-title">{{ title }}</span>
      <RouterLink :to="editLink" class="demo-block-action" title="Open in Editor">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      </RouterLink>
    </div>
    <div class="demo-block-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  source: string
  editLink: string
}>()
</script>

<style>
.demo-block {
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  margin-bottom: 16px;
  overflow: hidden;
}

.demo-block-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background: #fafafa;
  border-bottom: 1px solid #e8e8e8;
}

.demo-block-title {
  font-size: 13px;
  font-weight: 500;
  color: #666;
}

.demo-block-action {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  color: #999;
  transition: all 0.2s;
}
.demo-block-action:hover {
  color: #1677ff;
  background: rgba(22, 119, 255, 0.06);
}

.demo-block-content {
  padding: 24px;
}
</style>
