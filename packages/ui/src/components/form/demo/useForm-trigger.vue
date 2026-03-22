<script setup lang="ts">
import { reactive } from 'vue'
import { useForm } from '../useForm'
import type { Rule } from '../types'

const formRef = useForm()

const labelCol = { span: 4 }
const wrapperCol = { span: 14 }

const modelRef = reactive({
  name: '',
  region: undefined as string | undefined,
})

const rules: Record<string, Rule[]> = {
  name: [
    { required: true, message: 'Please input Activity name' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  region: [{ required: true, message: 'Please select region' }],
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

    <a-form-item label="Activity zone" name="region">
      <a-select v-model:value="modelRef.region" placeholder="please select your zone">
        <a-select-option value="shanghai">Zone one</a-select-option>
        <a-select-option value="beijing">Zone two</a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click.prevent="onSubmit">Create</a-button>
      <a-button style="margin-left: 10px" @click="onReset">Reset</a-button>
    </a-form-item>
  </a-form>
</template>
