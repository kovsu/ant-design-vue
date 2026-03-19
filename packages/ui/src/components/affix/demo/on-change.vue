<script setup lang="ts">
function onChange(affixed: boolean) {
  console.log('Affix state changed:', affixed)
}
</script>

<template>
  <a-affix :offset-top="120" @change="onChange">
    <a-button>Affix with onChange (offset 120px, check console)</a-button>
  </a-affix>
</template>
