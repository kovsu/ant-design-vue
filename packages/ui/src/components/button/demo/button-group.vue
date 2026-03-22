<template>
  <div>
    <h4 style="margin: 0 0 16px; font-size: 14px; font-weight: normal">Basic</h4>
    <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px">
      <a-button-group>
        <a-button>Cancel</a-button>
        <a-button type="primary">OK</a-button>
      </a-button-group>
      <a-button-group>
        <a-button disabled>L</a-button>
        <a-button disabled>M</a-button>
        <a-button disabled>R</a-button>
      </a-button-group>
      <a-button-group>
        <a-button type="primary">L</a-button>
        <a-button>M</a-button>
        <a-button>M</a-button>
        <a-button type="dashed">R</a-button>
      </a-button-group>
    </div>

    <h4 style="margin: 0 0 16px; font-size: 14px; font-weight: normal">With Icon</h4>
    <div style="display: flex; gap: 8px; flex-wrap: wrap">
      <a-button-group>
        <a-button type="primary">
          <template #icon><LeftOutlined /></template>
          Go back
        </a-button>
        <a-button type="primary">
          Go forward
          <RightOutlined />
        </a-button>
      </a-button-group>
      <a-button-group>
        <a-button type="primary">
          <template #icon><CloudOutlined /></template>
        </a-button>
        <a-button type="primary">
          <template #icon><CloudDownloadOutlined /></template>
        </a-button>
      </a-button-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import LeftOutlined from '@ant-design/icons-vue/LeftOutlined'
import RightOutlined from '@ant-design/icons-vue/RightOutlined'
import CloudOutlined from '@ant-design/icons-vue/CloudOutlined'
import CloudDownloadOutlined from '@ant-design/icons-vue/CloudDownloadOutlined'
</script>
