<script setup lang="ts">
import { reactive } from 'vue'

const formState = reactive({
  username: '',
  password: '',
})

function onFinish(values: any) {
  console.log('Success:', values)
}

function onFinishFailed(errorInfo: any) {
  console.log('Failed:', errorInfo)
}
</script>

<template>
  <a-form
    :model="formState"
    :label-col="{ span: 6 }"
    :wrapper-col="{ span: 18 }"
    @finish="onFinish"
    @finish-failed="onFinishFailed"
  >
    <a-form-item
      label="Username"
      name="username"
      :rules="[{ required: true, message: 'Please input your username!' }]"
    >
      <a-input v-model:value="formState.username" />
    </a-form-item>

    <a-form-item
      label="Password"
      name="password"
      :rules="[{ required: true, message: 'Please input your password!' }]"
    >
      <a-input-password v-model:value="formState.password" />
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 6, span: 18 }">
      <button type="submit" class="ant-btn ant-btn-primary">Submit</button>
    </a-form-item>
  </a-form>
</template>
