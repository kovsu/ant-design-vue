<script setup lang="ts">
import { reactive } from 'vue'

interface User {
  first: string
  last: string
  id: number
}

const formState = reactive<{ users: User[] }>({
  users: [],
})

function addUser() {
  formState.users.push({
    first: '',
    last: '',
    id: Date.now(),
  })
}

function removeUser(item: User) {
  const index = formState.users.indexOf(item)
  if (index !== -1) {
    formState.users.splice(index, 1)
  }
}

function onFinish(values: any) {
  console.log('Received values of form:', values)
}
</script>

<template>
  <a-form
    name="dynamic_form_nest_item"
    :model="formState"
    @finish="onFinish"
  >
    <a-space
      v-for="(user, index) in formState.users"
      :key="user.id"
      style="display: flex; margin-bottom: 8px"
      align="baseline"
    >
      <a-form-item
        :name="['users', index, 'first']"
        :rules="[{ required: true, message: 'Missing first name' }]"
      >
        <a-input v-model:value="user.first" placeholder="First Name" />
      </a-form-item>

      <a-form-item
        :name="['users', index, 'last']"
        :rules="[{ required: true, message: 'Missing last name' }]"
      >
        <a-input v-model:value="user.last" placeholder="Last Name" />
      </a-form-item>

      <a-button type="text" danger @click="removeUser(user)">Remove</a-button>
    </a-space>

    <a-form-item>
      <a-button type="dashed" block @click="addUser">
        Add user
      </a-button>
    </a-form-item>

    <a-form-item>
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>
