<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance } from '../types'

const expand = ref(false)
const formRef = ref<FormInstance>()
const formState = reactive<Record<string, string>>({})

function onFinish(values: any) {
  console.log('Received values of form:', values)
}

function resetForm() {
  formRef.value?.resetFields()
}
</script>

<template>
  <div>
    <a-form
      ref="formRef"
      name="advanced_search"
      :model="formState"
      @finish="onFinish"
    >
      <a-row :gutter="24">
        <template v-for="i in 10" :key="i">
          <a-col v-show="expand || i <= 6" :span="8">
            <a-form-item
              :name="`field-${i}`"
              :label="`Field ${i}`"
              :rules="[{ required: true, message: 'Please input something' }]"
            >
              <a-input v-model:value="formState[`field-${i}`]" placeholder="placeholder" />
            </a-form-item>
          </a-col>
        </template>
      </a-row>
      <a-row>
        <a-col :span="24" style="text-align: right">
          <a-button type="primary" html-type="submit">Search</a-button>
          <a-button style="margin: 0 8px" @click="resetForm">Clear</a-button>
          <a style="font-size: 12px" @click="expand = !expand">
            {{ expand ? 'Collapse' : 'Expand' }}
          </a>
        </a-col>
      </a-row>
    </a-form>
    <div
      style="
        margin-top: 16px;
        border: 1px dashed #e9e9e9;
        border-radius: 2px;
        background-color: #fafafa;
        min-height: 200px;
        text-align: center;
        padding-top: 80px;
      "
    >
      Search Result List
    </div>
  </div>
</template>
