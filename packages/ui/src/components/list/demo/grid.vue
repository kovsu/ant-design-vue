<script setup lang="ts">
const data = [
  { title: 'Title 1', content: 'Card content' },
  { title: 'Title 2', content: 'Card content' },
  { title: 'Title 3', content: 'Card content' },
  { title: 'Title 4', content: 'Card content' },
]
</script>

<template>
  <a-list :data-source="data" :grid="{ gutter: 16, column: 2 }">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-card :title="item.title">{{ item.content }}</a-card>
      </a-list-item>
    </template>
  </a-list>
</template>
