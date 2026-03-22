<script setup lang="ts">
import { reactive } from 'vue'
import { useForm } from '../useForm'
import type { Rule } from '../types'

const formRef = useForm()

const labelCol = { span: 4 }
const wrapperCol = { span: 14 }

const modelRef = reactive({
  name: '',
  sub: {
    name: '',
  },
})

const rules: Record<string, Rule[]> = {
  name: [{ required: true, message: 'Please input name' }],
  'sub.name': [{ required: true, message: 'Please input sub name' }],
}

function onSubmit() {
  formRef.value
    ?.validate()
    .then(() => {
      console.log('submit!', { ...modelRef })
    })
    .catch((err) => {
      console.log('error', err)
    })
}

function onReset() {
  formRef.value?.resetFields()
}
</script>

<template>
  <a-form
    ref="formRef"
    :model="modelRef"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-item label="Activity name" name="name">
      <a-input v-model:value="modelRef.name" />
    </a-form-item>

    <a-form-item label="Sub name" :name="['sub', 'name']">
      <a-input v-model:value="modelRef.sub.name" />
    </a-form-item>

    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click.prevent="onSubmit">Create</a-button>
      <a-button style="margin-left: 10px" @click="onReset">Reset</a-button>
    </a-form-item>
  </a-form>
</template>
