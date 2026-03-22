<template>
  <div v-if="group" class="browse">
    <h1 class="browse-title">{{ group.name }}</h1>
    <div v-for="demo in group.demos" :key="demo.name" class="demo-block">
      <h3 class="demo-name">{{ demo.name }}</h3>
      <div class="demo-content">
        <component :is="demo.component" />
      </div>
    </div>
  </div>
  <div v-else class="browse-empty">Component not found</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { findComponent } from '../data/demos'

const route = useRoute()
const group = computed(() => findComponent(route.params.component as string))
</script>

<style>
.browse {
  padding: 24px 32px;
  max-width: 960px;
}

.browse-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  text-transform: capitalize;
}

.demo-block {
  margin-bottom: 24px;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  overflow: hidden;
}

.demo-name {
  font-size: 14px;
  font-weight: 500;
  padding: 8px 16px;
  margin: 0;
  background: #fafafa;
  border-bottom: 1px solid #e8e8e8;
  color: #666;
}

.demo-content {
  padding: 24px;
}

.browse-empty {
  padding: 48px;
  text-align: center;
  color: #999;
}
</style>
