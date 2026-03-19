<template>
  <div>
    Current break point:
    <template v-for="(value, key) in screens" :key="key">
      <a-tag v-if="!!value" color="blue">{{ key }}</a-tag>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { useBreakpoint } from '@/hooks'

const screens = useBreakpoint()
</script>
