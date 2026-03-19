<template>
  <div>
    <a-typography-paragraph copyable>This is a copyable text.</a-typography-paragraph>
    <a-typography-paragraph :copyable="{ text: 'Custom copy text!' }">
      Copy different text than shown.
    </a-typography-paragraph>
    <a-typography-text copyable>Inline copyable text</a-typography-text>
  </div>
</template>
