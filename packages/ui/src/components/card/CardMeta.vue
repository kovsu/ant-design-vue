<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { CardMetaProps, CardMetaSlots } from './types'

defineOptions({ name: 'ACardMeta' })
const props = defineProps<CardMetaProps>()
defineSlots<CardMetaSlots>()
const slots = useSlots()

const hasTitle = computed(() => {
  return !!props.title || !!slots.title
})

const hasDescription = computed(() => {
  return !!props.description || !!slots.description
})
</script>

<template>
  <div class="ant-card-meta">
    <div v-if="$slots.avatar" class="ant-card-meta-avatar">
      <slot name="avatar" />
    </div>
    <div class="ant-card-meta-detail">
      <div v-if="hasTitle" class="ant-card-meta-title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="hasDescription" class="ant-card-meta-description">
        <slot name="description">{{ description }}</slot>
      </div>
    </div>
  </div>
</template>
