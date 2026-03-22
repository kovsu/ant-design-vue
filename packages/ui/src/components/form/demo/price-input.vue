<script setup lang="ts">
import { reactive, defineComponent, h } from 'vue'
import type { Rule } from '../types'

type Currency = 'rmb' | 'dollar'

interface PriceValue {
  number: number
  currency: Currency
}

const formState = reactive({
  price: {
    number: 0,
    currency: 'rmb' as Currency,
  },
})

function onNumberChange(e: Event) {
  const value = parseInt((e.target as HTMLInputElement).value || '0', 10)
  formState.price = { ...formState.price, number: value }
}

function onCurrencyChange(value: Currency) {
  formState.price = { ...formState.price, currency: value }
}

const checkPrice: Rule['validator'] = async (_rule, value: PriceValue) => {
  if (value.number > 0) {
    return
  }
  throw new Error('Price must be greater than zero!')
}

function onFinish(values: any) {
  console.log('Received values from form:', values)
}
</script>

<template>
  <a-form
    name="customized_form_controls"
    layout="inline"
    :model="formState"
    @finish="onFinish"
  >
    <a-form-item name="price" label="Price" :rules="[{ validator: checkPrice }]">
      <span style="display: inline-flex; align-items: center">
        <a-input
          type="text"
          :value="formState.price.number"
          style="width: 100px"
          @change="onNumberChange"
        />
        <a-select
          :value="formState.price.currency"
          style="width: 80px; margin: 0 8px"
          :options="[
            { value: 'rmb', label: 'RMB' },
            { value: 'dollar', label: 'Dollar' },
          ]"
          @change="onCurrencyChange"
        />
      </span>
    </a-form-item>

    <a-form-item>
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>
