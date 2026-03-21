<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <span class="sidebar-title">antdv</span>
    </div>

    <div class="sidebar-search">
      <input v-model="search" placeholder="Filter..." class="sidebar-search-input" />
    </div>

    <RouterLink to="/playground" :class="['sidebar-item sidebar-playground', { active: isPlayground }]">
      Playground
    </RouterLink>

    <nav class="sidebar-nav">
      <div v-for="group in filtered" :key="group.name" class="sidebar-group">
        <RouterLink
          :to="`/${group.name}`"
          :class="['sidebar-item sidebar-component', { active: group.name === activeComponent }]"
        >
          <span>{{ group.name }}</span>
          <span class="sidebar-badge">{{ group.demos.length }}</span>
        </RouterLink>
        <div v-if="group.name === activeComponent" class="sidebar-demos">
          <RouterLink
            v-for="demo in group.demos"
            :key="demo.name"
            :to="`/${group.name}/${demo.name}`"
            :class="['sidebar-item sidebar-demo', { active: demo.name === activeDemo }]"
          >
            {{ demo.name }}
          </RouterLink>
        </div>
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { componentGroups } from '#/data/demos'

const route = useRoute()
const search = ref('')

const activeComponent = computed(() => route.params.component as string | undefined)
const activeDemo = computed(() => route.params.demo as string | undefined)
const isPlayground = computed(() => route.path === '/playground')

const filtered = computed(() => {
  const q = search.value.toLowerCase()
  if (!q) return componentGroups
  return componentGroups.filter(g => g.name.includes(q))
})
</script>

<style>
.sidebar {
  width: 220px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: #fff;
  border-right: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 10;
}

.sidebar-header {
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
  flex-shrink: 0;
}

.sidebar-title {
  font-size: 15px;
  font-weight: 700;
  color: #333;
}

.sidebar-search {
  padding: 8px 12px;
  flex-shrink: 0;
}

.sidebar-search-input {
  width: 100%;
  padding: 6px 10px;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  font-size: 13px;
  outline: none;
  transition: border-color 0.2s;
}
.sidebar-search-input:focus {
  border-color: #1677ff;
}

.sidebar-playground {
  margin: 0 12px 4px;
  font-weight: 600;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 10px !important;
}

.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  padding: 4px 0;
}

.sidebar-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 16px;
  font-size: 13px;
  color: #555;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.15s;
}
.sidebar-item:hover {
  color: #1677ff;
  background: #f5f8ff;
}
.sidebar-item.active {
  color: #1677ff;
  background: #e6f4ff;
  font-weight: 500;
}

.sidebar-badge {
  font-size: 11px;
  color: #999;
  background: #f5f5f5;
  padding: 0 6px;
  border-radius: 10px;
  line-height: 18px;
}

.sidebar-demos {
  padding: 2px 0;
}

.sidebar-demo {
  padding-left: 32px !important;
  font-size: 12px !important;
  color: #888 !important;
}
.sidebar-demo.active {
  color: #1677ff !important;
  background: #e6f4ff;
}
</style>
