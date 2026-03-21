<script setup lang="ts">
import { ref } from 'vue'

const mode = ref<'copyable' | 'editable'>('copyable')
const editableStr = ref('This is an editable text.')
const copyableStr = 'This is a copyable text.'
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <a-radio-group v-model:value="mode">
      <a-radio value="copyable">Copyable</a-radio>
      <a-radio value="editable">Editable</a-radio>
    </a-radio-group>

    <template v-if="mode === 'copyable'">
      <a-typography-paragraph copyable>{{ copyableStr }}</a-typography-paragraph>
      <a-typography-text copyable>Inline copyable text</a-typography-text>
    </template>

    <template v-else>
      <a-typography-paragraph
        :copyable="false"
        :ellipsis="false"
      >
        {{ editableStr }}
      </a-typography-paragraph>
      <a-typography-text strong>Current text: {{ editableStr }}</a-typography-text>
    </template>
  </div>
</template>
