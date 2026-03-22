<script setup lang="ts">
import { ref, computed } from 'vue'

const checked = ref(false)
const disabled = ref(false)

function toggleChecked() {
  checked.value = !checked.value
}

function toggleDisabled() {
  disabled.value = !disabled.value
}

const label = computed(() => {
  return `${checked.value ? 'Checked' : 'Unchecked'}-${disabled.value ? 'Disabled' : 'Enabled'}`
})
</script>

<template>
  <div>
    <p style="margin-bottom: 20px;">
      <a-checkbox v-model:checked="checked" :disabled="disabled">
        {{ label }}
      </a-checkbox>
    </p>
    <p style="display: flex; gap: 10px;">
      <a-button variant="solid" size="sm" @click="toggleChecked">
        {{ !checked ? 'Check' : 'Uncheck' }}
      </a-button>
      <a-button variant="solid" size="sm" @click="toggleDisabled">
        {{ !disabled ? 'Disable' : 'Enable' }}
      </a-button>
    </p>
  </div>
</template>
