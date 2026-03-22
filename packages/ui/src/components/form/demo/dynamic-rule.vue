<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import type { FormInstance } from '../types'

interface FormState {
  username: string
  nickname: string
  checkNick: boolean
}

const formRef = ref<FormInstance>()

const formState = reactive<FormState>({
  username: '',
  nickname: '',
  checkNick: false,
})

watch(
  () => formState.checkNick,
  () => {
    formRef.value?.validateFields(['nickname'])
  },
  { flush: 'post' },
)

async function onCheck() {
  try {
    const values = await formRef.value?.validateFields()
    console.log('Success:', values)
  } catch (errorInfo) {
    console.log('Failed:', errorInfo)
  }
}
</script>

<template>
  <a-form
    ref="formRef"
    :model="formState"
    name="dynamic_rule"
    :label-col="{ span: 4 }"
    :wrapper-col="{ span: 8 }"
  >
    <a-form-item
      label="Username"
      name="username"
      :rules="[{ required: true, message: 'Please input your username!' }]"
    >
      <a-input v-model:value="formState.username" />
    </a-form-item>

    <a-form-item
      label="Nickname"
      name="nickname"
      :rules="[{ required: formState.checkNick, message: 'Please input your nickname!' }]"
    >
      <a-input v-model:value="formState.nickname" />
    </a-form-item>

    <a-form-item
      name="checkNick"
      :wrapper-col="{ span: 8, offset: 4 }"
    >
      <a-checkbox v-model:checked="formState.checkNick">
        Nickname is required
      </a-checkbox>
    </a-form-item>

    <a-form-item :wrapper-col="{ span: 8, offset: 4 }">
      <a-button type="primary" @click="onCheck">Check</a-button>
    </a-form-item>
  </a-form>
</template>
