<template>
  <div style="display: flex; gap: 16px; align-items: center;">
    <a-avatar :style="{ backgroundColor: color, verticalAlign: 'middle' }" :gap="gap">{{ user }}</a-avatar>
    <a-button size="sm" @click="changeUser">Change</a-button>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
const users = ['U', 'Lucy', 'Tom', 'Edward']
const colors = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae']
const idx = ref(0)
const user = computed(() => users[idx.value % users.length])
const color = computed(() => colors[idx.value % colors.length])
const gap = ref(4)
function changeUser() { idx.value++ }
</script>
