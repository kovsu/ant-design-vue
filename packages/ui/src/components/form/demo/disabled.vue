<script setup lang="ts">
import { ref } from 'vue'

const componentDisabled = ref(true)
const radioValue = ref('apple')
const checked = ref(false)
</script>

<template>
  <div>
    <a-checkbox
      :checked="componentDisabled"
      @change="(e: any) => (componentDisabled = e.target.checked)"
    >
      Form disabled
    </a-checkbox>

    <a-form
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 14 }"
      layout="horizontal"
      :disabled="componentDisabled"
      style="max-width: 600px; margin-top: 16px"
    >
      <a-form-item label="Checkbox">
        <a-checkbox>Checkbox</a-checkbox>
      </a-form-item>

      <a-form-item label="Radio">
        <a-radio-group v-model:value="radioValue">
          <a-radio value="apple">Apple</a-radio>
          <a-radio value="pear">Pear</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="Input">
        <a-input />
      </a-form-item>

      <a-form-item label="Select">
        <a-select>
          <a-select-option value="demo">Demo</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="InputNumber">
        <a-input-number />
      </a-form-item>

      <a-form-item label="Switch">
        <a-switch v-model:checked="checked" />
      </a-form-item>

      <a-form-item label="Button">
        <a-button>Button</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
