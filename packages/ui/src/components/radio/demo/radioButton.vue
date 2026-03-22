<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref('a')
const value2 = ref('a')
const value3 = ref('a')
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px">
    <a-radio-group v-model:value="value1">
      <a-radio-button value="a">Hangzhou</a-radio-button>
      <a-radio-button value="b">Shanghai</a-radio-button>
      <a-radio-button value="c">Beijing</a-radio-button>
      <a-radio-button value="d">Chengdu</a-radio-button>
    </a-radio-group>

    <a-radio-group v-model:value="value2">
      <a-radio-button value="a">Hangzhou</a-radio-button>
      <a-radio-button value="b" disabled>Shanghai</a-radio-button>
      <a-radio-button value="c">Beijing</a-radio-button>
      <a-radio-button value="d">Chengdu</a-radio-button>
    </a-radio-group>

    <a-radio-group v-model:value="value3" disabled>
      <a-radio-button value="a">Hangzhou</a-radio-button>
      <a-radio-button value="b">Shanghai</a-radio-button>
      <a-radio-button value="c">Beijing</a-radio-button>
      <a-radio-button value="d">Chengdu</a-radio-button>
    </a-radio-group>
  </div>
</template>
