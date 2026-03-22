<template>
  <div style="display: flex; flex-direction: column; gap: 12px; max-width: 400px">
    <a-input v-model:value="userName" placeholder="Enter your username">
      <template #prefix>
        <UserOutlined />
      </template>
      <template #suffix>
        <a-tooltip title="Extra information">
          <InfoCircleOutlined style="color: rgba(0, 0, 0, 0.45)" />
        </a-tooltip>
      </template>
    </a-input>
    <a-input prefix="$" suffix="USD" placeholder="Amount" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UserOutlined, InfoCircleOutlined } from '@ant-design/icons-vue'

const userName = ref('')
</script>
