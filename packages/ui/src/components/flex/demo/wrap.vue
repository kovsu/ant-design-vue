<template>
  <a-flex :wrap="true" gap="small">
    <a-button v-for="i in 20" :key="i" variant="solid">Button {{ i }}</a-button>
  </a-flex>
</template>
