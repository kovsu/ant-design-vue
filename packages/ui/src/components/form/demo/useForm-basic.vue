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
  type: [] as string[],
})

const rules: Record<string, Rule[]> = {
  name: [{ required: true, message: 'Please input name' }],
  region: [{ required: true, message: 'Please select region' }],
  type: [{ required: true, message: 'Please select type', type: 'array' }],
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

    <a-form-item label="Activity type" name="type">
      <a-checkbox-group v-model:value="modelRef.type">
        <a-checkbox value="1" name="type">Online</a-checkbox>
        <a-checkbox value="2" name="type">Promotion</a-checkbox>
        <a-checkbox value="3" name="type">Offline</a-checkbox>
      </a-checkbox-group>
    </a-form-item>

    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click.prevent="onSubmit">Create</a-button>
      <a-button style="margin-left: 10px" @click="onReset">Reset</a-button>
    </a-form-item>
  </a-form>
</template>
