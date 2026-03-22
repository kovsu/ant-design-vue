<template>
  <div style="display: flex; flex-direction: column; gap: 12px; max-width: 400px">
    <a-input-password v-model:value="value1" placeholder="Input password" />
    <a-input-password
      v-model:value="value2"
      placeholder="No visibility toggle"
      :visibility-toggle="false"
    />
    <div style="display: flex; gap: 8px; align-items: center">
      <a-input-password
        v-model:value="value3"
        v-model:visible="visible"
        placeholder="Controlled visibility"
      />
      <a-button @click="visible = !visible">
        {{ visible ? 'Hide' : 'Show' }}
      </a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
const visible = ref(false)
</script>
