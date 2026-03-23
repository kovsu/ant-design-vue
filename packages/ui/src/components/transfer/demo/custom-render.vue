<script setup lang="ts">
import { ref } from 'vue'

const dataSource = [
  { key: '1', title: 'Apple', description: 'A fruit', tag: 'fruit' },
  { key: '2', title: 'Banana', description: 'A yellow fruit', tag: 'fruit' },
  { key: '3', title: 'Carrot', description: 'A vegetable', tag: 'vegetable' },
  { key: '4', title: 'Dog', description: 'A pet', tag: 'animal' },
  { key: '5', title: 'Eagle', description: 'A bird', tag: 'animal' },
  { key: '6', title: 'Fern', description: 'A plant', tag: 'plant' },
]

const targetKeys = ref(['3', '5'])
</script>

<template>
  <a-transfer
    v-model:target-keys="targetKeys"
    :data-source="dataSource"
    :titles="['Source', 'Target']"
    show-search
  >
    <template #render="{ item }">
      <span>{{ item.title }} - <em style="color: rgba(0,0,0,0.45)">{{ item.tag }}</em></span>
    </template>
  </a-transfer>
</template>
