<script setup lang="ts">
import { reactive } from 'vue'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

const formState = reactive({
  user: {
    name: '',
    email: '',
    age: undefined as number | undefined,
    website: '',
    introduction: '',
  },
})

function onFinish(values: any) {
  console.log('Success:', values)
}
</script>

<template>
  <a-form
    :model="formState"
    v-bind="layout"
    name="nest-messages"
    @finish="onFinish"
  >
    <a-form-item
      :name="['user', 'name']"
      label="Name"
      :rules="[{ required: true, message: 'Name is required!' }]"
    >
      <a-input v-model:value="formState.user.name" />
    </a-form-item>

    <a-form-item
      :name="['user', 'email']"
      label="Email"
      :rules="[{ type: 'email', message: 'Not a valid email!' }]"
    >
      <a-input v-model:value="formState.user.email" />
    </a-form-item>

    <a-form-item
      :name="['user', 'age']"
      label="Age"
      :rules="[{ type: 'number', min: 0, max: 99, message: 'Age must be between 0 and 99' }]"
    >
      <a-input-number v-model:value="formState.user.age" style="width: 100%" />
    </a-form-item>

    <a-form-item :name="['user', 'website']" label="Website">
      <a-input v-model:value="formState.user.website" />
    </a-form-item>

    <a-form-item :name="['user', 'introduction']" label="Introduction">
      <a-textarea v-model:value="formState.user.introduction" />
    </a-form-item>

    <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>
