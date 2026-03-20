<script setup lang="ts">
defineOptions({ name: 'PanelHeader' })

withDefaults(defineProps<{
  title?: string
  superPrev?: boolean
  prev?: boolean
  next?: boolean
  superNext?: boolean
}>(), {
  superPrev: true,
  prev: true,
  next: true,
  superNext: true,
})

const emit = defineEmits<{
  (e: 'superPrev'): void
  (e: 'prev'): void
  (e: 'next'): void
  (e: 'superNext'): void
  (e: 'titleClick'): void
}>()
</script>

<template>
  <div class="ant-picker-header">
    <button
      v-if="superPrev"
      type="button"
      class="ant-picker-header-super-prev-btn"
      tabindex="-1"
      @click="emit('superPrev')"
    >
      «
    </button>
    <button
      v-if="prev"
      type="button"
      class="ant-picker-header-prev-btn"
      tabindex="-1"
      @click="emit('prev')"
    >
      ‹
    </button>
    <div class="ant-picker-header-view">
      <button type="button" class="ant-picker-header-title-btn" @click="emit('titleClick')">
        {{ title }}
      </button>
    </div>
    <button
      v-if="next"
      type="button"
      class="ant-picker-header-next-btn"
      tabindex="-1"
      @click="emit('next')"
    >
      ›
    </button>
    <button
      v-if="superNext"
      type="button"
      class="ant-picker-header-super-next-btn"
      tabindex="-1"
      @click="emit('superNext')"
    >
      »
    </button>
  </div>
</template>
