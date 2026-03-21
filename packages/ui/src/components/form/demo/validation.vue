<script setup lang="ts">
import { reactive } from 'vue'
import type { Rule } from '../types'

const formState = reactive({
  name: '',
  email: '',
  age: undefined as number | undefined,
  website: '',
  note: '',
})

const validateAge = async (_rule: Rule, value: any) => {
  if (value === undefined || value === null || value === '') {
    throw new Error('Please enter age')
  }
  if (!Number.isInteger(value)) {
    throw new Error('Please enter an integer')
  }
  if (value < 0 || value > 150) {
    throw new Error('Age must be between 0 and 150')
  }
}

const rules: Record<string, Rule[]> = {
  name: [
    { required: true, message: 'Please enter your name' },
    { min: 2, max: 20, message: 'Name must be 2-20 characters' },
  ],
  email: [
    { required: true, message: 'Please enter your email' },
    { type: 'email', message: 'Please enter a valid email' },
  ],
  age: [
    { required: true, message: 'Please enter your age' },
    { validator: validateAge },
  ],
  website: [
    { type: 'url', message: 'Please enter a valid URL' },
  ],
  note: [
    { required: true, message: 'Please enter a note' },
    { min: 10, message: 'Note must be at least 10 characters' },
    { pattern: /^[a-zA-Z0-9\s.,!?]+$/, message: 'Only letters, numbers, and basic punctuation', warningOnly: true },
  ],
}

function onFinish(values: any) {
  console.log('Validation passed:', values)
}
</script>

<template>
  <a-form
    :model="formState"
    :rules="rules"
    :label-col="{ span: 6 }"
    :wrapper-col="{ span: 18 }"
    @finish="onFinish"
  >
    <a-form-item label="Name" name="name">
      <a-input v-model:value="formState.name" placeholder="2-20 characters" />
    </a-form-item>

    <a-form-item label="Email" name="email">
      <a-input v-model:value="formState.email" placeholder="user@example.com" />
    </a-form-item>

    <a-form-item label="Age" name="age">
      <a-input-number v-model:value="formState.age" :min="0" :max="150" style="width: 100%" />
    </a-form-item>

    <a-form-item label="Website" name="website">
      <a-input v-model:value="formState.website" placeholder="https://example.com" />
    </a-form-item>

    <a-form-item label="Note" name="note">
      <a-input v-model:value="formState.note" placeholder="At least 10 characters" />
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 6, span: 18 }">
      <button type="submit" class="ant-btn ant-btn-primary">Validate & Submit</button>
    </a-form-item>
  </a-form>
</template>
