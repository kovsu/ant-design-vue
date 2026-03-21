<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { ListItemMetaProps, ListItemMetaSlots } from './types'

defineOptions({ name: 'AListItemMeta' })
const props = defineProps<ListItemMetaProps>()
defineSlots<ListItemMetaSlots>()
const slots = useSlots()

const hasAvatar = computed(() => !!props.avatar || !!slots.avatar)
const hasTitle = computed(() => !!props.title || !!slots.title)
const hasDescription = computed(() => !!props.description || !!slots.description)
const hasContent = computed(() => hasTitle.value || hasDescription.value)
</script>

<template>
  <div class="ant-list-item-meta">
    <div v-if="hasAvatar" class="ant-list-item-meta-avatar">
      <slot name="avatar">
        <a-avatar :src="avatar" />
      </slot>
    </div>
    <div v-if="hasContent" class="ant-list-item-meta-content">
      <h4 v-if="hasTitle" class="ant-list-item-meta-title">
        <slot name="title">{{ title }}</slot>
      </h4>
      <div v-if="hasDescription" class="ant-list-item-meta-description">
        <slot name="description">{{ description }}</slot>
      </div>
    </div>
    <slot />
  </div>
</template>
