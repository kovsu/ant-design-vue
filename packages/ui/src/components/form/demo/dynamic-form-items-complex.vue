<script setup lang="ts">
import { reactive, watch } from 'vue'

interface Sight {
  value: string | undefined
  price: string | undefined
  id: number
}

const areas = [
  { label: 'Beijing', value: 'Beijing' },
  { label: 'Shanghai', value: 'Shanghai' },
]

const sights: Record<string, string[]> = {
  Beijing: ['Tiananmen', 'Great Wall'],
  Shanghai: ['Oriental Pearl', 'The Bund'],
}

const formState = reactive<{ sights: Sight[]; area: string | undefined }>({
  sights: [],
  area: undefined,
})

watch(
  () => formState.area,
  () => {
    formState.sights = []
  },
)

function addSight() {
  formState.sights.push({
    value: undefined,
    price: undefined,
    id: Date.now(),
  })
}

function removeSight(item: Sight) {
  const index = formState.sights.indexOf(item)
  if (index !== -1) {
    formState.sights.splice(index, 1)
  }
}

function onFinish(values: any) {
  console.log('Received values of form:', values)
}
</script>

<template>
  <a-form
    name="dynamic_form_complex"
    :model="formState"
    @finish="onFinish"
  >
    <a-form-item
      name="area"
      label="Area"
      :rules="[{ required: true, message: 'Missing area' }]"
    >
      <a-select v-model:value="formState.area" :options="areas" />
    </a-form-item>

    <a-space
      v-for="(sight, index) in formState.sights"
      :key="sight.id"
      style="display: flex; margin-bottom: 8px"
      align="baseline"
    >
      <a-form-item
        :name="['sights', index, 'value']"
        label="Sight"
        :rules="[{ required: true, message: 'Missing sight' }]"
      >
        <a-select
          v-model:value="sight.value"
          :disabled="!formState.area"
          :options="(sights[formState.area!] || []).map((a: string) => ({ value: a }))"
          style="width: 130px"
        />
      </a-form-item>

      <a-form-item
        label="Price"
        :name="['sights', index, 'price']"
        :rules="[{ required: true, message: 'Missing price' }]"
      >
        <a-input v-model:value="sight.price" />
      </a-form-item>

      <a-button type="text" danger @click="removeSight(sight)">Remove</a-button>
    </a-space>

    <a-form-item>
      <a-button type="dashed" block @click="addSight">
        Add sights
      </a-button>
    </a-form-item>

    <a-form-item>
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>
