<template>
  <div style="display: flex; flex-direction: column; gap: 8px; padding: 40px;">
    <a-dropdown-button type="primary" loading>
      <template #overlay>
        <a-menu>
          <a-menu-item item-key="1">Submit and continue</a-menu-item>
        </a-menu>
      </template>
      Submit
    </a-dropdown-button>

    <a-dropdown-button type="primary" size="sm" loading>
      <template #overlay>
        <a-menu>
          <a-menu-item item-key="1">Submit and continue</a-menu-item>
        </a-menu>
      </template>
      Submit
    </a-dropdown-button>

    <a-dropdown-button type="primary" :loading="loading1" @click="enterLoading1">
      <template #overlay>
        <a-menu>
          <a-menu-item item-key="1">Submit and continue</a-menu-item>
        </a-menu>
      </template>
      Submit
    </a-dropdown-button>

    <a-dropdown-button :loading="loading2" @click="enterLoading2">
      <template #overlay>
        <a-menu>
          <a-menu-item item-key="1">Submit and continue</a-menu-item>
        </a-menu>
      </template>
      Submit
    </a-dropdown-button>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'

const loading1 = ref(false)
const loading2 = ref(false)

function enterLoading(loading: Ref<boolean>) {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 6000)
}

function enterLoading1() {
  enterLoading(loading1)
}

function enterLoading2() {
  enterLoading(loading2)
}
</script>
