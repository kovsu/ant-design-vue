<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref('a')
const value2 = ref('a')
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <a-radio-group v-model:value="value1" button-style="outline">
      <a-radio-button value="a">Hangzhou</a-radio-button>
      <a-radio-button value="b">Shanghai</a-radio-button>
      <a-radio-button value="c">Beijing</a-radio-button>
      <a-radio-button value="d">Chengdu</a-radio-button>
    </a-radio-group>

    <a-radio-group v-model:value="value2" button-style="solid">
      <a-radio-button value="a">Hangzhou</a-radio-button>
      <a-radio-button value="b">Shanghai</a-radio-button>
      <a-radio-button value="c">Beijing</a-radio-button>
      <a-radio-button value="d">Chengdu</a-radio-button>
    </a-radio-group>
  </div>
</template>
