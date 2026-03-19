<script setup lang="ts">
import { computed, ref } from 'vue'
import type { TitleProps } from './types'
import { titleDefaultProps } from './types'
import { useTypographyClasses, useEllipsis, useCopyable } from './composables'

defineOptions({ name: 'ATypographyTitle' })
const props = withDefaults(defineProps<TitleProps>(), titleDefaultProps)

const textContent = ref('')
const tag = computed(() => `h${props.level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5')
const classes = useTypographyClasses(props)
const { config: ellipsisConfig, expanded, ellipsisStyle, toggleExpand } = useEllipsis(props)
const { config: copyConfig, copied, handleCopy } = useCopyable(props, textContent)
</script>

<template>
  <component :is="tag" :class="classes" :style="ellipsisStyle">
    <slot />
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
  </component>
</template>
