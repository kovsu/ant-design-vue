<script setup lang="ts">
const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
]
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 24px;">
    <div>
      <h4>Small Size</h4>
      <a-list size="sm" bordered :data-source="data">
        <template #header>Header</template>
        <template #footer>Footer</template>
        <template #renderItem="{ item }">
          <a-list-item>{{ item }}</a-list-item>
        </template>
      </a-list>
    </div>
    <div>
      <h4>Default Size</h4>
      <a-list bordered :data-source="data">
        <template #header>Header</template>
        <template #footer>Footer</template>
        <template #renderItem="{ item }">
          <a-list-item>{{ item }}</a-list-item>
        </template>
      </a-list>
    </div>
    <div>
      <h4>Large Size</h4>
      <a-list size="lg" bordered :data-source="data">
        <template #header>Header</template>
        <template #footer>Footer</template>
        <template #renderItem="{ item }">
          <a-list-item>{{ item }}</a-list-item>
        </template>
      </a-list>
    </div>
  </div>
</template>
