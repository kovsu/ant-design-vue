<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormLayout } from '../types'

const layout = ref<FormLayout>('horizontal')

const formState = reactive({
  field1: '',
  field2: '',
})

function onFinish(values: any) {
  console.log('Submitted:', values)
}
</script>

<template>
  <div>
    <div style="margin-bottom: 16px">
      <a-radio-group v-model:value="layout">
        <a-radio value="horizontal">Horizontal</a-radio>
        <a-radio value="vertical">Vertical</a-radio>
        <a-radio value="inline">Inline</a-radio>
      </a-radio-group>
    </div>

    <a-form
      :model="formState"
      :layout="layout"
      :label-col="layout === 'horizontal' ? { span: 6 } : undefined"
      :wrapper-col="layout === 'horizontal' ? { span: 18 } : undefined"
      @finish="onFinish"
    >
      <a-form-item
        label="Field A"
        name="field1"
        :rules="[{ required: true, message: 'Please enter field A' }]"
      >
        <a-input v-model:value="formState.field1" placeholder="Enter something" />
      </a-form-item>

      <a-form-item
        label="Field B"
        name="field2"
        :rules="[{ required: true, message: 'Please enter field B' }]"
      >
        <a-input v-model:value="formState.field2" placeholder="Enter something" />
      </a-form-item>

      <a-form-item
        :wrapper-col="layout === 'horizontal' ? { offset: 6, span: 18 } : undefined"
      >
        <button type="submit" class="ant-btn ant-btn-primary">Submit</button>
      </a-form-item>
    </a-form>
  </div>
</template>
