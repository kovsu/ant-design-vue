<template>
  <div v-if="group" class="browse">
    <h1 class="browse-title">{{ group.name }}</h1>
    <DemoBlock
      v-for="demo in group.demos"
      :key="demo.name"
      :title="demo.name"
      :source="demo.raw"
      :edit-link="`/${group.name}/${demo.name}`"
    >
      <component :is="demo.component" />
    </DemoBlock>
  </div>
  <div v-else class="browse-empty">Component not found</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { findComponent } from '#/data/demos'
import DemoBlock from '#/components/DemoBlock.vue'

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

.browse-empty {
  padding: 48px;
  text-align: center;
  color: #999;
}
</style>
