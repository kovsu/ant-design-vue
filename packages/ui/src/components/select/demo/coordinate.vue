<template>
  <div style="display: flex; gap: 16px">
    <a-select
      v-model:value="province"
      style="width: 120px"
      :options="provinceData.map(p => ({ value: p, label: p }))"
    />
    <a-select
      v-model:value="city"
      style="width: 120px"
      :options="cities.map(c => ({ value: c, label: c }))"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const provinceData = ['Zhejiang', 'Jiangsu']
const cityData: Record<string, string[]> = {
  Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
  Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
}

const province = ref(provinceData[0])
const city = ref(cityData[province.value][0])

const cities = computed(() => cityData[province.value])

watch(province, (val) => {
  city.value = cityData[val][0]
})
</script>
