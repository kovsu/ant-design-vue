<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px">
    <h4>Popup Placement</h4>
    <a-radio-group v-model:value="placement">
      <a-radio-button value="topLeft">topLeft</a-radio-button>
      <a-radio-button value="topRight">topRight</a-radio-button>
      <a-radio-button value="bottomLeft">bottomLeft</a-radio-button>
      <a-radio-button value="bottomRight">bottomRight</a-radio-button>
    </a-radio-group>
    <a-select
      v-model:value="value"
      style="width: 200px"
      :dropdown-match-select-width="false"
      :placement="placement"
      :options="options"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type Placement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'

const placement = ref<Placement>('topLeft')
const value = ref('HangZhou')

const options = [
  { value: 'HangZhou', label: 'HangZhou #310000' },
  { value: 'NingBo', label: 'NingBo #315000' },
  { value: 'WenZhou', label: 'WenZhou #325000' },
]
</script>
