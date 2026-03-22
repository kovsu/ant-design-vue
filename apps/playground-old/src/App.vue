<template>
  <div class="app">
    <aside class="sidebar">
      <h2 class="sidebar-title">Old Components</h2>
      <nav>
        <router-link
          v-for="group in componentGroups"
          :key="group.name"
          :to="`/${group.name}`"
          class="nav-link"
          :class="{ active: route.params.component === group.name }"
        >
          {{ group.name }}
        </router-link>
      </nav>
    </aside>
    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { componentGroups } from './data/demos'

const route = useRoute()
</script>

<style>
.app {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 200px;
  border-right: 1px solid #e8e8e8;
  padding: 16px 0;
  overflow-y: auto;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  background: #fff;
}

.sidebar-title {
  font-size: 16px;
  font-weight: 600;
  padding: 0 16px 12px;
  margin: 0;
  border-bottom: 1px solid #e8e8e8;
}

.main {
  flex: 1;
  margin-left: 200px;
}

.nav-link {
  display: block;
  padding: 6px 16px;
  color: #333;
  text-decoration: none;
  font-size: 13px;
}

.nav-link:hover {
  background: #f5f5f5;
}

.nav-link.active {
  color: #1890ff;
  background: #e6f7ff;
  font-weight: 500;
}
</style>
