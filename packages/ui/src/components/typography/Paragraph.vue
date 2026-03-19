<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ParagraphProps } from './types'
import { useTypographyClasses, useEllipsis, useCopyable } from './composables'

defineOptions({ name: 'ATypographyParagraph' })
const props = defineProps<ParagraphProps>()

const textContent = ref('')
const classes = computed(() => ({
  ...useTypographyClasses(props).value,
  'ant-typography-strong': props.strong,
  'ant-typography-underline': props.underline,
  'ant-typography-delete': props.delete,
  'ant-typography-mark': props.mark,
  'ant-typography-italic': props.italic,
}))
const { config: ellipsisConfig, expanded, ellipsisStyle, toggleExpand } = useEllipsis(props)
const { config: copyConfig, copied, handleCopy } = useCopyable(props, textContent)
</script>

<template>
  <div :class="classes" :style="ellipsisStyle">
    <code v-if="props.code"><slot /></code>
    <slot v-else />
    <a v-if="ellipsisConfig?.expandable && !expanded" class="ant-typography-expand" @click.prevent="toggleExpand">
      {{ ellipsisConfig.symbol ?? 'Expand' }}
    </a>
    <span
      v-if="copyConfig"
      class="ant-typography-copy"
      :class="{ 'ant-typography-copy-success': copied }"
      role="button"
      tabindex="0"
      @click="handleCopy"
    >
      {{ copied ? '✓' : '⎘' }}
    </span>
  </div>
</template>
