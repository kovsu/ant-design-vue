<template>
  <div style="max-width: 500px">
    <h4>Mentions with Form</h4>
    <a-form layout="horizontal" :model="formState" @finish="handleSubmit">
      <a-form-item
        label="Top coders"
        name="coders"
        :rules="[{ required: true, message: 'Please mention at least one coder' }]"
      >
        <a-mentions
          v-model:value="formState.coders"
          :options="options"
          rows="1"
        />
      </a-form-item>
      <a-form-item
        label="Bio"
        name="bio"
        :rules="[{ required: true, message: 'Please input your bio' }]"
      >
        <a-mentions
          v-model:value="formState.bio"
          rows="3"
          placeholder="You can use @ to mention someone"
          :options="options"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">Submit</a-button>
        <a-button style="margin-left: 8px" @click="handleReset">Reset</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const formState = reactive({
  coders: '',
  bio: '',
})

const options = [
  { value: 'afc163', label: 'afc163' },
  { value: 'zombieJ', label: 'zombieJ' },
  { value: 'yesmeck', label: 'yesmeck' },
]

const handleSubmit = () => {
  console.log('Submitted:', formState)
}

const handleReset = () => {
  formState.coders = ''
  formState.bio = ''
}
</script>
