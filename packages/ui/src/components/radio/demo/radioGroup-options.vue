<script setup lang="ts">
import { ref } from 'vue'

const plainOptions = ['Apple', 'Pear', 'Orange']
const optionsWithDisabled = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange', disabled: true },
]
const value1 = ref('Apple')
const value2 = ref('Apple')
const value3 = ref('Apple')
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px">
    <a-radio-group v-model:value="value1" :options="plainOptions" />
    <a-radio-group v-model:value="value2" :options="optionsWithDisabled" />
    <a-radio-group v-model:value="value3" :options="plainOptions" disabled />
    <a-radio-group v-model:value="value1" option-type="button" :options="plainOptions" />
    <a-radio-group v-model:value="value2" option-type="button" :options="optionsWithDisabled" />
    <a-radio-group v-model:value="value3" option-type="button" :options="plainOptions" disabled />
  </div>
</template>
