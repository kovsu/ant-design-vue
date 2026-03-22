<template>
  <div>
    <a-button variant="solid" @click="open = true">New account</a-button>
    <a-drawer
      v-model:open="open"
      title="Create a new account"
      :width="720"
    >
      <a-form :model="form" layout="vertical">
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="Name" name="name">
              <a-input v-model:value="form.name" placeholder="Please enter user name" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Url" name="url">
              <a-input
                v-model:value="form.url"
                style="width: 100%"
                placeholder="Please enter url"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="Owner" name="owner">
              <a-select v-model:value="form.owner" placeholder="Please select an owner">
                <a-select-option value="xiao">Xiaoxiao Fu</a-select-option>
                <a-select-option value="mao">Maomao Zhou</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Type" name="type">
              <a-select v-model:value="form.type" placeholder="Please choose the type">
                <a-select-option value="private">Private</a-select-option>
                <a-select-option value="public">Public</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="Description" name="description">
              <a-textarea
                v-model:value="form.description"
                :rows="4"
                placeholder="Please enter a description"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <template #extra>
        <a-space>
          <a-button @click="open = false">Cancel</a-button>
          <a-button variant="solid" @click="onSubmit">Submit</a-button>
        </a-space>
      </template>
    </a-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const open = ref(false)

const form = reactive({
  name: '',
  url: '',
  owner: '',
  type: '',
  description: '',
})

function onSubmit() {
  console.log('form submitted:', { ...form })
  open.value = false
}
</script>
