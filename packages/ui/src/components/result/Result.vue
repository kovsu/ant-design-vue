<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { ResultProps, ResultSlots } from './types'
import { resultDefaultProps } from './types'
import SuccessIcon from './icons/SuccessIcon.vue'
import ErrorIcon from './icons/ErrorIcon.vue'
import InfoIcon from './icons/InfoIcon.vue'
import WarningIcon from './icons/WarningIcon.vue'
import UnauthorizedIcon from './icons/UnauthorizedIcon.vue'
import NotFoundIcon from './icons/NotFoundIcon.vue'
import ServerErrorIcon from './icons/ServerErrorIcon.vue'

defineOptions({ name: 'AResult' })
const props = withDefaults(defineProps<ResultProps>(), resultDefaultProps)
defineSlots<ResultSlots>()
const slots = useSlots()

const iconComponents: Record<string, any> = {
  success: SuccessIcon,
  error: ErrorIcon,
  info: InfoIcon,
  warning: WarningIcon,
  403: UnauthorizedIcon,
  404: NotFoundIcon,
  500: ServerErrorIcon,
}

const iconComponent = computed(() => {
  return iconComponents[String(props.status)] || InfoIcon
})

const statusClass = computed(() => {
  return `ant-result-${props.status}`
})

const classes = computed(() => ({
  'ant-result': true,
  [statusClass.value]: true,
}))

const hasTitle = computed(() => {
  return !!props.title || !!slots.title
})

const hasSubTitle = computed(() => {
  return !!props.subTitle || !!slots.subTitle
})
</script>

<template>
  <div :class="classes" role="status">
    <div class="ant-result-icon" aria-hidden="true">
      <slot name="icon">
        <component :is="iconComponent" />
      </slot>
    </div>
    <div v-if="hasTitle" class="ant-result-title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div v-if="hasSubTitle" class="ant-result-subtitle">
      <slot name="subTitle">{{ subTitle }}</slot>
    </div>
    <div v-if="$slots.extra" class="ant-result-extra">
      <slot name="extra" />
    </div>
    <div v-if="$slots.default" class="ant-result-content">
      <slot />
    </div>
  </div>
</template>
