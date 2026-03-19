<template>
  <a-space :wrap="true" size="small">
    <a-button v-for="i in 15" :key="i" variant="outlined">Button {{ i }}</a-button>
  </a-space>
</template>
