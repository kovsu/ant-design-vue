<script setup lang="ts">
import { computed, provide, toRef } from 'vue'
import type { BreadcrumbProps, BreadcrumbSlots } from './types'
import { breadcrumbDefaultProps, breadcrumbContextKey } from './types'

defineOptions({ name: 'ABreadcrumb' })
const props = withDefaults(defineProps<BreadcrumbProps>(), breadcrumbDefaultProps)
defineSlots<BreadcrumbSlots>()

provide(breadcrumbContextKey, {
  separator: toRef(props, 'separator'),
})
</script>

<template>
  <nav class="ant-breadcrumb" aria-label="Breadcrumb">
    <ol>
      <slot />
    </ol>
  </nav>
</template>
