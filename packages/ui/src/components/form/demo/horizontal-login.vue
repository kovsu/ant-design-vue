<script setup lang="ts">
import { reactive } from 'vue'

interface FormState {
  user: string
  password: string
}

const formState = reactive<FormState>({
  user: '',
  password: '',
})

function handleFinish(values: any) {
  console.log('Success:', values)
}

function handleFinishFailed(errors: any) {
  console.log('Failed:', errors)
}
</script>

<template>
  <a-form
    layout="inline"
    :model="formState"
    @finish="handleFinish"
    @finish-failed="handleFinishFailed"
  >
    <a-form-item>
      <a-input v-model:value="formState.user" placeholder="Username" />
    </a-form-item>

    <a-form-item>
      <a-input
        v-model:value="formState.password"
        type="password"
        placeholder="Password"
      />
    </a-form-item>

    <a-form-item>
      <a-button
        type="primary"
        html-type="submit"
        :disabled="formState.user === '' || formState.password === ''"
      >
        Log in
      </a-button>
    </a-form-item>
  </a-form>
</template>
