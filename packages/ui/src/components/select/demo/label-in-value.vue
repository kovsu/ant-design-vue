<template>
  <div style="max-width: 300px">
    <h4>Label In Value</h4>
    <p style="margin-bottom: 8px; color: #666">
      onChange returns { value, label } instead of just value
    </p>
    <a-select
      v-model:value="value"
      label-in-value
      style="width: 200px"
      :options="options"
      @change="handleChange"
    />
    <p style="margin-top: 8px">Selected: {{ JSON.stringify(value) }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const options = [
  { value: 'jack', label: 'Jack (100)' },
  { value: 'lucy', label: 'Lucy (101)' },
]

const value = ref({ value: 'lucy', label: 'Lucy (101)' })

const handleChange = (val: any) => {
  console.log('onChange:', val)
}
</script>
