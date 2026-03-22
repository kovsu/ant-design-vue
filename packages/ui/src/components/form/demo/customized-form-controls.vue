<script setup lang="ts">
import { reactive } from 'vue'
import type { Rule } from '../types'

interface PriceValue {
  number: number
  currency: 'rmb' | 'dollar'
}

const formState = reactive({
  price: {
    number: 0,
    currency: 'rmb' as 'rmb' | 'dollar',
  },
})

function onFinish(values: any) {
  console.log('Received values from form:', values)
}

const checkPrice: Rule['validator'] = async (_rule, value: PriceValue) => {
  if (value.number > 0) {
    return Promise.resolve()
  }
  return Promise.reject(new Error('Price must be greater than zero!'))
}
</script>

<template>
  <a-form
    name="customized_form_controls"
    layout="inline"
    :model="formState"
    @finish="onFinish"
  >
    <a-form-item
      name="price"
      label="Price"
      :rules="[{ validator: checkPrice }]"
    >
      <div style="display: flex; gap: 8px">
        <a-input-number
          v-model:value="formState.price.number"
          style="width: 120px"
        />
        <a-select v-model:value="formState.price.currency" style="width: 100px">
          <a-select-option value="rmb">RMB</a-select-option>
          <a-select-option value="dollar">Dollar</a-select-option>
        </a-select>
      </div>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>
