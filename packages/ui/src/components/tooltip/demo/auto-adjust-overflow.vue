<template>
  <div :style="wrapStyles">
    <a-tooltip placement="left" title="Prompt Text" :get-popup-container="getPopupContainer">
      <a-button>Adjust automatically</a-button>
    </a-tooltip>
    <br />
    <a-tooltip
      placement="left"
      title="Prompt Text"
      :get-popup-container="getPopupContainer"
      :auto-adjust-overflow="false"
    >
      <a-button style="margin-top: 10px;">Ignore overflow</a-button>
    </a-tooltip>
  </div>
</template>

<script setup lang="ts">
const wrapStyles: Record<string, string> = {
  overflow: 'hidden',
  position: 'relative',
  padding: '24px',
  border: '1px solid #e9e9e9',
}

function getPopupContainer(trigger: HTMLElement) {
  return trigger.parentElement!
}
</script>
