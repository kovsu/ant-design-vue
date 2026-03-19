<script setup lang="ts">
import { computed, inject } from 'vue'
import type { BreadcrumbItemProps, BreadcrumbItemEmits, BreadcrumbItemSlots } from './types'
import { breadcrumbContextKey } from './types'

defineOptions({ name: 'ABreadcrumbItem' })
const props = defineProps<BreadcrumbItemProps>()
const emit = defineEmits<BreadcrumbItemEmits>()
defineSlots<BreadcrumbItemSlots>()

const context = inject(breadcrumbContextKey, null)

const separatorText = computed(() => context?.separator.value ?? '/')

function handleClick(event: MouseEvent) {
  emit('click', event)
}
</script>

<template>
  <li class="ant-breadcrumb-item">
    <span class="ant-breadcrumb-link">
      <a v-if="href" :href="href" @click="handleClick">
        <slot />
      </a>
      <span v-else>
        <slot />
      </span>
    </span>
    <span class="ant-breadcrumb-separator" aria-hidden="true">
      <slot name="separator">{{ separatorText }}</slot>
    </span>
  </li>
</template>
