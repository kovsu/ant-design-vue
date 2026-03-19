<script setup lang="ts">
import { computed, ref } from 'vue'

const allOptions = ['Apple', 'Pear', 'Orange', 'Mango']
const checkedList = ref<string[]>(['Apple', 'Orange'])

const checkAll = computed(() => checkedList.value.length === allOptions.length)
const indeterminate = computed(
  () => checkedList.value.length > 0 && checkedList.value.length < allOptions.length,
)

function onCheckAllChange(e: Event) {
  const target = e.target as HTMLInputElement
  checkedList.value = target.checked ? [...allOptions] : []
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <a-checkbox
      :checked="checkAll"
      :indeterminate="indeterminate"
      @change="onCheckAllChange"
    >
      Check all
    </a-checkbox>
    <hr style="margin: 0; border: none; border-top: 1px solid #d9d9d9;" />
    <a-checkbox-group v-model:value="checkedList" :options="allOptions" />
  </div>
</template>
