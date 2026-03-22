<script setup lang="ts">
import { reactive, ref, watch, toRaw } from 'vue'
import type { FormInstance } from '../types'

interface UserType {
  name?: string
  age?: number
  key?: number
}

interface FormState {
  group: string
  users: UserType[]
}

const formRef = ref<FormInstance>()
const modalFormRef = ref<FormInstance>()
const visible = ref(false)

const formState = reactive<FormState>({
  group: '',
  users: [],
})

const modalFormState = ref<UserType>({})

watch(
  visible,
  () => {
    modalFormState.value = {}
  },
  { flush: 'post' },
)

function onOk() {
  modalFormRef.value?.validateFields().then(() => {
    formState.users.push({ ...modalFormState.value, key: Date.now() })
    visible.value = false
  })
}

function onFinish() {
  console.log('Finish:', toRaw(formState))
}
</script>

<template>
  <a-form
    ref="formRef"
    :model="formState"
    name="form_context"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    @finish="onFinish"
  >
    <a-form-item
      name="group"
      label="Group Name"
      :rules="[{ required: true, message: 'Please input group name!' }]"
    >
      <a-input v-model:value="formState.group" />
    </a-form-item>

    <a-form-item label="User List">
      <template v-if="formState.users.length">
        <ul style="padding-left: 20px">
          <li v-for="user in formState.users" :key="user.key" style="margin-bottom: 4px">
            {{ user.name }} - {{ user.age }}
          </li>
        </ul>
      </template>
      <template v-else>
        <span style="color: rgba(0, 0, 0, 0.45)">No user yet.</span>
      </template>
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button html-type="submit" type="primary">Submit</a-button>
      <a-button style="margin-left: 8px" @click="visible = true">Add User</a-button>
    </a-form-item>
  </a-form>

  <a-modal v-model:open="visible" title="Add User" @ok="onOk">
    <a-form
      ref="modalFormRef"
      :model="modalFormState"
      layout="vertical"
      name="userForm"
    >
      <a-form-item name="name" label="User Name" :rules="[{ required: true }]">
        <a-input v-model:value="modalFormState.name" />
      </a-form-item>
      <a-form-item name="age" label="User Age" :rules="[{ required: true }]">
        <a-input-number v-model:value="modalFormState.age" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
