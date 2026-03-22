<script setup lang="ts">
import { ref, reactive } from 'vue'

const options = reactive(['Daily', 'Weekly', 'Monthly'])
const value = ref('Daily')
const moreLoaded = ref(false)

function loadMore() {
  options.push('Quarterly', 'Yearly')
  moreLoaded.value = true
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <a-segmented v-model:value="value" :options="options" />
    <a-button variant="solid" :disabled="moreLoaded" @click="loadMore">
      Load More
    </a-button>
  </div>
</template>
