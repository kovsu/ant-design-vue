<script setup lang="ts">
import { computed } from 'vue'
import { type EmptySlots } from './types'
import DefaultEmpty from './DefaultEmpty.vue'

defineOptions({ name: 'AEmpty' })

const props = withDefaults(
  defineProps<{
    /** Custom description text; pass false to hide */
    description?: string | false
    /** Custom image (as URL string) */
    image?: string
    /** Image style override */
    imageStyle?: Record<string, string>
  }>(),
  { description: undefined },
)

defineSlots<EmptySlots>()

const showDescription = computed(() => props.description !== false)
const descriptionText = computed(() =>
  typeof props.description === 'string' ? props.description : 'No Data',
)
</script>

<template>
  <div class="ant-empty" role="status">
    <div class="ant-empty-image" :style="imageStyle" aria-hidden="true">
      <slot name="image">
        <img v-if="image" :src="image" alt="" />
        <DefaultEmpty v-else />
      </slot>
    </div>
    <div v-if="showDescription" class="ant-empty-description">
      <slot name="description">{{ descriptionText }}</slot>
    </div>
    <div v-if="$slots.default" class="ant-empty-footer">
      <slot />
    </div>
  </div>
</template>
