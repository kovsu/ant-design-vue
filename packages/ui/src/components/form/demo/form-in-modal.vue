<script setup lang="ts">
import { reactive, ref, toRaw } from 'vue'
import type { FormInstance } from '../types'

interface Values {
  title: string
  description: string
  modifier: string
}

const formRef = ref<FormInstance>()
const visible = ref(false)

const formState = reactive<Values>({
  title: '',
  description: '',
  modifier: 'public',
})

function onOk() {
  formRef.value
    ?.validateFields()
    .then((values) => {
      console.log('Received values of form:', values)
      console.log('formState:', toRaw(formState))
      visible.value = false
      formRef.value?.resetFields()
    })
    .catch((info) => {
      console.log('Validate Failed:', info)
    })
}
</script>

<template>
  <div>
    <a-button type="primary" @click="visible = true">New Collection</a-button>

    <a-modal
      v-model:open="visible"
      title="Create a new collection"
      ok-text="Create"
      cancel-text="Cancel"
      @ok="onOk"
    >
      <a-form
        ref="formRef"
        :model="formState"
        layout="vertical"
        name="form_in_modal"
      >
        <a-form-item
          name="title"
          label="Title"
          :rules="[{ required: true, message: 'Please input the title of collection!' }]"
        >
          <a-input v-model:value="formState.title" />
        </a-form-item>

        <a-form-item name="description" label="Description">
          <a-textarea v-model:value="formState.description" />
        </a-form-item>

        <a-form-item name="modifier" style="margin-bottom: 0">
          <a-radio-group v-model:value="formState.modifier">
            <a-radio value="public">Public</a-radio>
            <a-radio value="private">Private</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
