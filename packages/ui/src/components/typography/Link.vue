<script setup lang="ts">
import { computed, ref } from 'vue'
import type { LinkProps } from './types'
import { useTypographyClasses, useEllipsis, useCopyable } from './composables'

defineOptions({ name: 'ATypographyLink' })
const props = defineProps<LinkProps>()

const textContent = ref('')
const classes = computed(() => ({
  ...useTypographyClasses(props).value,
  'ant-typography-strong': props.strong,
  'ant-typography-underline': props.underline,
  'ant-typography-delete': props.delete,
  'ant-typography-italic': props.italic,
}))
const { config: ellipsisConfig, expanded, ellipsisStyle } = useEllipsis(props)
const { config: copyConfig, copied, handleCopy } = useCopyable(props, textContent)

const rel = computed(() => props.target === '_blank' ? 'noopener noreferrer' : undefined)
</script>

<template>
  <a :class="classes" :style="ellipsisStyle" :href="props.href" :target="props.target" :rel="rel">
    <slot />
    <button
      v-if="copyConfig"
      type="button"
      class="ant-typography-copy"
      :class="{ 'ant-typography-copy-success': copied }"
      :aria-label="copied ? 'Copied' : 'Copy'"
      @click.stop.prevent="handleCopy"
    >
      {{ copied ? '✓' : '⎘' }}
    </button>
  </a>
</template>
