<template>
  <a-anchor
    :target-offset="targetOffset"
    :items="[
      { key: '1', href: '#basic', title: 'Basic demo' },
      { key: '2', href: '#static', title: 'Static demo' },
      {
        key: '3',
        href: '#api',
        title: 'API',
        children: [
          { key: '4', href: '#anchor-props', title: 'Anchor Props' },
          { key: '5', href: '#link-props', title: 'Link Props' },
        ],
      },
    ]"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const targetOffset = ref<number | undefined>(undefined)

onMounted(() => {
  targetOffset.value = window.innerHeight / 2
})
</script>
