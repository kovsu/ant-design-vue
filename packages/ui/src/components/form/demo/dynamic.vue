<script setup lang="ts">
import { reactive } from 'vue'

const formState = reactive<{
  users: { name: string; email: string }[]
}>({
  users: [{ name: '', email: '' }],
})

function addUser() {
  formState.users.push({ name: '', email: '' })
}

function removeUser(index: number) {
  if (formState.users.length > 1) {
    formState.users.splice(index, 1)
  }
}

function onFinish(values: any) {
  console.log('Dynamic form submitted:', values)
}
</script>

<template>
  <a-form
    :model="formState"
    :label-col="{ span: 6 }"
    :wrapper-col="{ span: 18 }"
    @finish="onFinish"
  >
    <div v-for="(user, index) in formState.users" :key="index" style="margin-bottom: 8px">
      <a-form-item
        :label="`Name ${index + 1}`"
        :name="['users', index, 'name']"
        :rules="[{ required: true, message: 'Please enter name' }]"
      >
        <div style="display: flex; gap: 8px">
          <a-input v-model:value="user.name" placeholder="Name" style="flex: 1" />
          <button
            type="button"
            class="ant-btn"
            :disabled="formState.users.length <= 1"
            @click="removeUser(index)"
          >
            Remove
          </button>
        </div>
      </a-form-item>

      <a-form-item
        :label="`Email ${index + 1}`"
        :name="['users', index, 'email']"
        :rules="[
          { required: true, message: 'Please enter email' },
          { type: 'email', message: 'Please enter a valid email' },
        ]"
      >
        <a-input v-model:value="user.email" placeholder="Email" />
      </a-form-item>
    </div>

    <a-form-item :wrapper-col="{ offset: 6, span: 18 }">
      <button type="button" class="ant-btn" style="margin-right: 8px" @click="addUser">
        Add User
      </button>
      <button type="submit" class="ant-btn ant-btn-primary">Submit All</button>
    </a-form-item>
  </a-form>
</template>
