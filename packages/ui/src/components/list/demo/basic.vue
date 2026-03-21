<script setup lang="ts">
const data = [
  'Racing car sprance the finish line just ahead of her competitor.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing weddings.',
  'Los Angeles battles water supply crisis.',
]
</script>

<template>
  <a-list bordered :data-source="data">
    <template #header>Header</template>
    <template #footer>Footer</template>
    <template #renderItem="{ item }">
      <a-list-item>{{ item }}</a-list-item>
    </template>
  </a-list>
</template>
