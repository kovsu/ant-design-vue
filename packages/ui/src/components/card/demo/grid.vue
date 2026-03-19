<template>
  <div style="max-width: 600px;">
    <a-card title="Card Grid">
      <a-card-grid v-for="i in 6" :key="i" style="width: 33.33%; text-align: center;">
        Content {{ i }}
      </a-card-grid>
    </a-card>
  </div>
</template>
