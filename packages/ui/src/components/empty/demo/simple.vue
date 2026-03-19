<template>
  <a-empty>
    <template #image>
      <SimpleEmpty />
    </template>
    <template #description>
      <span>Customize <a href="#API">Description</a></span>
    </template>
  </a-empty>
</template>

<script setup>
import { SimpleEmpty } from '@ant-design-vue/ui'
</script>
