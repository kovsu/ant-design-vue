<script setup lang="ts">
const formatter = (value: number | string | undefined) => {
  if (value === undefined || value === null || value === '') return ''
  return `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const parser = (value: string) => {
  return Number(value.replace(/\$\s?|(,*)/g, ''))
}

const percentFormatter = (value: number | string | undefined) => {
  if (value === undefined || value === null || value === '') return ''
  return `${value}%`
}

const percentParser = (value: string) => {
  return Number(value.replace('%', ''))
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <a-input-number
      :default-value="1000"
      :formatter="formatter"
      :parser="parser"
      style="width: 200px"
    />
    <a-input-number
      :default-value="100"
      :min="0"
      :max="100"
      :formatter="percentFormatter"
      :parser="percentParser"
      style="width: 200px"
    />
  </div>
</template>
