<script setup lang="ts">
import { ref, computed, shallowRef, defineAsyncComponent } from 'vue'

// Glob import all demo files
const demoModules = import.meta.glob('../src/components/*/demo/*.vue')

interface DemoEntry {
  name: string
  component: ReturnType<typeof defineAsyncComponent>
  file: string
}

interface ComponentGroup {
  name: string
  demos: DemoEntry[]
}

// Parse demos from glob
const components = computed<ComponentGroup[]>(() => {
  const map = new Map<string, DemoEntry[]>()

  for (const path of Object.keys(demoModules)) {
    // path: ../src/components/button/demo/basic.vue
    const match = path.match(/components\/([^/]+)\/demo\/([^/]+)\.vue$/)
    if (!match) continue

    const [, componentName, demoName] = match
    if (!map.has(componentName)) map.set(componentName, [])

    map.get(componentName)!.push({
      name: demoName,
      component: defineAsyncComponent(demoModules[path] as any),
      file: `${componentName}/demo/${demoName}.vue`,
    })
  }

  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, demos]) => ({ name, demos }))
})

const activeComponent = ref(components.value[0]?.name ?? '')

const activeDemos = computed(
  () => components.value.find(c => c.name === activeComponent.value)?.demos ?? [],
)
</script>

<template>
  <div class="dev-layout">
    <aside class="dev-sidebar">
      <h2 class="dev-logo">antdv dev</h2>
      <nav>
        <a
          v-for="group in components"
          :key="group.name"
          :class="['dev-nav-item', { active: activeComponent === group.name }]"
          @click="activeComponent = group.name"
        >
          {{ group.name }}
          <span class="dev-badge">{{ group.demos.length }}</span>
        </a>
      </nav>
    </aside>
    <main class="dev-main">
      <h1 class="dev-title">{{ activeComponent }}</h1>
      <section v-for="demo in activeDemos" :key="demo.name" class="dev-demo">
        <h3 class="dev-demo-title">{{ demo.name }}</h3>
        <div class="dev-demo-box">
          <component :is="demo.component" />
        </div>
        <p class="dev-demo-file">{{ demo.file }}</p>
      </section>
      <p v-if="!activeDemos.length" class="dev-empty">No demos found.</p>
    </main>
  </div>
</template>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
    sans-serif;
  color: #333;
  background: #f5f5f5;
}

.dev-layout {
  display: flex;
  min-height: 100vh;
}

.dev-sidebar {
  width: 220px;
  background: #fff;
  border-right: 1px solid #e8e8e8;
  padding: 16px 0;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  overflow-y: auto;
}

.dev-logo {
  font-size: 16px;
  font-weight: 600;
  padding: 0 20px 16px;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 8px;
}

.dev-nav-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 20px;
  cursor: pointer;
  font-size: 14px;
  color: #555;
  text-decoration: none;
  transition: all 0.2s;
}

.dev-nav-item:hover {
  color: #1677ff;
  background: #f0f5ff;
}

.dev-nav-item.active {
  color: #1677ff;
  background: #e6f4ff;
  font-weight: 500;
}

.dev-badge {
  font-size: 12px;
  color: #999;
  background: #f5f5f5;
  padding: 0 6px;
  border-radius: 10px;
}

.dev-main {
  flex: 1;
  margin-left: 220px;
  padding: 32px 40px;
}

.dev-title {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 24px;
  text-transform: capitalize;
}

.dev-demo {
  margin-bottom: 32px;
}

.dev-demo-title {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 12px;
  text-transform: capitalize;
  color: #333;
}

.dev-demo-box {
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  padding: 24px;
}

.dev-demo-file {
  margin-top: 8px;
  font-size: 12px;
  color: #999;
  font-family: monospace;
}

.dev-empty {
  color: #999;
  font-size: 14px;
}
</style>
