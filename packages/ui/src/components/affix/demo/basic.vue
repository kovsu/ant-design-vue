<script setup lang="ts">
import { ref } from 'vue'

const top = ref(10)
const bottom = ref(10)
</script>

<template>
  <div>
    <a-affix :offset-top="top">
      <a-button variant="solid" @click="top += 10">
        Affix top (offset: {{ top }}px)
      </a-button>
    </a-affix>
    <br />
    <br />
    <a-affix :offset-bottom="bottom">
      <a-button variant="solid" @click="bottom += 10">
        Affix bottom (offset: {{ bottom }}px)
      </a-button>
    </a-affix>
  </div>
</template>
