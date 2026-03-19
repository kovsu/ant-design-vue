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
  </component>
</template>
