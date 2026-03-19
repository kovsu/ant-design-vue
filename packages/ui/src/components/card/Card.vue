<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { CardProps, CardEmits, CardSlots } from './types'
import { cardDefaultProps } from './types'

defineOptions({ name: 'ACard' })
const props = withDefaults(defineProps<CardProps>(), cardDefaultProps)
defineEmits<CardEmits>()
defineSlots<CardSlots>()
const slots = useSlots()

const hasTitle = computed(() => {
  return !!props.title || !!slots.title
})

const hasHead = computed(() => {
  return hasTitle.value || !!slots.extra
})

const classes = computed(() => ({
  'ant-card': true,
  'ant-card-bordered': props.bordered,
  'ant-card-hoverable': props.hoverable,
  'ant-card-loading': props.loading,
  'ant-card-small': props.size === 'small',
  'ant-card-type-inner': props.type === 'inner',
}))
</script>

<template>
  <div :class="classes">
    <div v-if="hasHead" class="ant-card-head" :style="headStyle">
      <div class="ant-card-head-wrapper">
        <div v-if="hasTitle" class="ant-card-head-title">
          <slot name="title">{{ title }}</slot>
        </div>
        <div v-if="$slots.extra" class="ant-card-extra">
          <slot name="extra" />
        </div>
      </div>
    </div>
    <div v-if="$slots.cover" class="ant-card-cover">
      <slot name="cover" />
    </div>
    <div class="ant-card-body" :style="bodyStyle">
      <div v-if="loading" class="ant-card-loading-content">
        <div class="ant-card-loading-block" style="width: 94%" />
        <div class="ant-card-loading-block" style="width: 28%" />
        <div class="ant-card-loading-block" style="width: 62%" />
        <div class="ant-card-loading-block" style="width: 22%" />
        <div class="ant-card-loading-block" style="width: 66%" />
      </div>
      <slot v-else />
    </div>
    <ul v-if="$slots.actions" class="ant-card-actions">
      <slot name="actions" />
    </ul>
  </div>
</template>
