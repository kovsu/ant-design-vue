<template>
  <a-tooltip :trigger="['focus']" placement="topLeft" overlay-class-name="numeric-input">
    <template v-if="inputValue" #title>
      <span class="numeric-input-title">{{ formatValue }}</span>
    </template>
    <a-input
      v-model:value="inputValue"
      placeholder="Input a number"
      :maxlength="25"
      style="width: 120px"
      @blur="onBlur"
    />
  </a-tooltip>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

function formatNumber(value: string) {
  const list = value.split('.')
  const prefix = list[0].charAt(0) === '-' ? '-' : ''
  let num = prefix ? list[0].slice(1) : list[0]
  let result = ''

  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`
    num = num.slice(0, num.length - 3)
  }
  if (num) {
    result = num + result
  }

  return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`
}

const inputValue = ref('111')

const formatValue = computed(() => {
  if (inputValue.value === '-') return '-'
  return formatNumber(inputValue.value)
})

const format = (val: string, preVal: string) => {
  const reg = /^-?\d*(\.\d*)?$/
  if ((!isNaN(+val) && reg.test(val)) || val === '' || val === '-') {
    inputValue.value = val
  } else {
    inputValue.value = preVal
  }
}

const onBlur = () => {
  if (
    inputValue.value.charAt(inputValue.value.length - 1) === '.' ||
    inputValue.value === '-'
  ) {
    format(inputValue.value.slice(0, -1), inputValue.value)
  }
}

watch(inputValue, (val, preVal) => {
  format(val, preVal)
})
</script>
