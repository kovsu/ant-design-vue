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
    <button v-if="ellipsisConfig?.expandable && !expanded" type="button" class="ant-typography-expand" @click="toggleExpand">
      {{ ellipsisConfig.symbol ?? 'Expand' }}
    </button>
    <button
      v-if="copyConfig"
      type="button"
      class="ant-typography-copy"
      :class="{ 'ant-typography-copy-success': copied }"
      :aria-label="copied ? 'Copied' : 'Copy'"
      @click="handleCopy"
    >
      {{ copied ? '✓' : '⎘' }}
    </button>
  </div>
</template>
