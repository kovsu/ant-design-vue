<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(false)
</script>

<template>
  <div>
    <a-radio v-model:checked="checked">Radio</a-radio>
    <p>Checked: {{ checked }}</p>
  </div>
</template>
