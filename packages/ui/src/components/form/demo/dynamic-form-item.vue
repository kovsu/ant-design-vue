<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance } from '../types'

interface Domain {
  value: string
  key: number
}

const formRef = ref<FormInstance>()

const formState = reactive<{ domains: Domain[] }>({
  domains: [],
})

function addDomain() {
  formState.domains.push({
    value: '',
    key: Date.now(),
  })
}

function removeDomain(item: Domain) {
  const index = formState.domains.indexOf(item)
  if (index !== -1) {
    formState.domains.splice(index, 1)
  }
}

function submitForm() {
  formRef.value
    ?.validate()
    .then(() => {
      console.log('values', formState.domains)
    })
    .catch((error: any) => {
      console.log('error', error)
    })
}

function resetForm() {
  formRef.value?.resetFields()
}
</script>

<template>
  <a-form
    ref="formRef"
    name="dynamic_form_item"
    :model="formState"
    :label-col="{ span: 4 }"
    :wrapper-col="{ span: 20 }"
  >
    <a-form-item
      v-for="(domain, index) in formState.domains"
      :key="domain.key"
      v-bind="index === 0 ? { label: 'Domains' } : {}"
      :name="['domains', index, 'value']"
      :rules="[{ required: true, message: 'Domain cannot be empty', trigger: 'change' }]"
      :wrapper-col="index === 0 ? { span: 20 } : { span: 20, offset: 4 }"
    >
      <div style="display: flex; gap: 8px; align-items: center">
        <a-input
          v-model:value="domain.value"
          placeholder="Please input domain"
          style="flex: 1"
        />
        <a-button
          v-if="formState.domains.length > 1"
          type="text"
          danger
          @click="removeDomain(domain)"
        >
          Remove
        </a-button>
      </div>
    </a-form-item>

    <a-form-item :wrapper-col="{ span: 20, offset: 4 }">
      <a-button type="dashed" style="width: 60%" @click="addDomain">
        Add field
      </a-button>
    </a-form-item>

    <a-form-item :wrapper-col="{ span: 20, offset: 4 }">
      <a-button type="primary" @click="submitForm">Submit</a-button>
      <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
    </a-form-item>
  </a-form>
</template>
