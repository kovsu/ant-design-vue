<template>
  <div style="display: flex; flex-wrap: wrap; gap: 8px;">
    <a-tag>Tag 1</a-tag>
    <a-tag>
      <template #icon><span>&#128279;</span></template>
      Link
    </a-tag>
    <a-tag closable>Closable</a-tag>
    <a-tag closable @close.prevent>Prevent Default</a-tag>
  </div>
</template>
