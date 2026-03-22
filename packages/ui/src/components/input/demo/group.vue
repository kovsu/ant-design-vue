<template>
  <div style="display: flex; flex-direction: column; gap: 16px">
    <a-input-group size="large">
      <a-row :gutter="8">
        <a-col :span="5">
          <a-input v-model:value="value1" />
        </a-col>
        <a-col :span="8">
          <a-input v-model:value="value2" />
        </a-col>
      </a-row>
    </a-input-group>

    <a-input-group compact>
      <a-input v-model:value="value1" style="width: 20%" />
      <a-input v-model:value="value2" style="width: 30%" />
    </a-input-group>

    <a-input-group compact>
      <a-select v-model:value="selectValue">
        <a-select-option value="Zhejiang">Zhejiang</a-select-option>
        <a-select-option value="Jiangsu">Jiangsu</a-select-option>
      </a-select>
      <a-input v-model:value="value3" style="width: 50%" />
    </a-input-group>

    <a-input-group compact>
      <a-input v-model:value="value4" style="width: calc(100% - 200px)" />
      <a-button type="primary">Submit</a-button>
    </a-input-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref('0571')
const value2 = ref('26888888')
const value3 = ref('Xihu District, Hangzhou')
const value4 = ref('https://antdv.com')
const selectValue = ref('Zhejiang')
</script>
