<script setup lang="ts">
defineOptions({ name: 'AInputGroup', inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg' | 'small' | 'middle' | 'large'
    compact?: boolean
  }>(),
  { size: undefined, compact: false },
)
</script>

<template>
  <span
    class="ant-input-group"
    :class="{
      'ant-input-group-lg': props.size === 'lg' || props.size === 'large',
      'ant-input-group-sm': props.size === 'sm' || props.size === 'small',
      'ant-input-group-compact': props.compact,
    }"
    v-bind="$attrs"
  >
    <slot />
  </span>
</template>
