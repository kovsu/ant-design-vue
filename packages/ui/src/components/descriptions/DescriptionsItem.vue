<script setup lang="ts">
import { computed, inject } from 'vue'
import type { DescriptionsItemProps, DescriptionsItemSlots } from './types'
import { descriptionsItemDefaultProps, descriptionsContextKey } from './types'

defineOptions({ name: 'ADescriptionsItem' })
const props = withDefaults(defineProps<DescriptionsItemProps>(), descriptionsItemDefaultProps)
defineSlots<DescriptionsItemSlots>()

const context = inject(descriptionsContextKey, null)

const mergedLabelStyle = computed(() => ({
  ...context?.labelStyle.value,
  ...props.labelStyle,
}))

const mergedContentStyle = computed(() => ({
  ...context?.contentStyle.value,
  ...props.contentStyle,
}))
</script>

<template>
  <!--
    DescriptionsItem is rendered by the parent Descriptions via <component :is="node" />.
    The parent handles the table cell layout; this component just renders its content.
  -->
  <span class="ant-descriptions-item-content-inner" :style="mergedContentStyle">
    <slot />
  </span>
</template>
