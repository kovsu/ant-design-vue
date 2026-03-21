<script setup lang="ts">
const data = [
  {
    title: 'Ant Design Vue',
    description: 'An enterprise-class UI components based on Ant Design and Vue.',
    content: 'We supply a series of design principles, practical patterns and high quality design resources, to help people create their product prototypes beautifully and efficiently.',
    image: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
  },
  {
    title: 'Ant Design',
    description: 'A design system for enterprise-level products.',
    content: 'Ant Design provides sufficient design guidelines, best practices, resources, and tools to help designers produce high-quality product prototypes.',
    image: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
  },
]
</script>

<template>
  <a-list :data-source="data" item-layout="vertical">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-list-item-meta :title="item.title" :description="item.description" />
        {{ item.content }}
        <template #actions>
          <span>likes: 156</span>
          <span>comments: 2</span>
        </template>
        <template #extra>
          <img :src="item.image" alt="cover" width="272" />
        </template>
      </a-list-item>
    </template>
  </a-list>
</template>
