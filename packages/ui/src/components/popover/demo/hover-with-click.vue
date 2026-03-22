<script setup lang="ts">
import { ref } from 'vue'

const clicked = ref(false)
const hovered = ref(false)

function hide() {
  clicked.value = false
  hovered.value = false
}

function handleHoverChange(visible: boolean) {
  clicked.value = false
  hovered.value = visible
}

function handleClickChange(visible: boolean) {
  clicked.value = visible
  hovered.value = false
}
</script>

<template>
  <div style="padding: 40px;">
    <a-popover
      style="width: 500px"
      title="Hover title"
      trigger="hover"
      :open="hovered"
      @open-change="handleHoverChange"
    >
      <template #content>
        <div>This is hover content.</div>
      </template>
      <a-popover
        title="Click title"
        trigger="click"
        :open="clicked"
        @open-change="handleClickChange"
      >
        <template #content>
          <div>
            <div>This is click content.</div>
            <a @click="hide">Close</a>
          </div>
        </template>
        <a-button>Hover and click</a-button>
      </a-popover>
    </a-popover>
  </div>
</template>
