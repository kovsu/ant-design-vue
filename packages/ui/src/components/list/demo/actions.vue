<script setup lang="ts">
const data = [
  { title: 'Ant Design Vue', description: 'An enterprise-class UI components based on Ant Design and Vue.' },
  { title: 'Ant Design', description: 'A design system for enterprise-level products.' },
  { title: 'Ant Design Pro', description: 'An out-of-box UI solution for enterprise applications.' },
]
</script>

<template>
  <a-list :data-source="data">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-list-item-meta :title="item.title" :description="item.description" />
        <template #actions>
          <a href="#">edit</a>
          <a href="#">delete</a>
        </template>
      </a-list-item>
    </template>
  </a-list>
</template>
