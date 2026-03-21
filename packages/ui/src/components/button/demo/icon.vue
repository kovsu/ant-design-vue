<template>
  <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center">
    <a-tooltip title="Search">
      <a-button variant="solid" shape="circle">
        <template #icon><SearchOutlined /></template>
      </a-button>
    </a-tooltip>
    <a-tooltip title="Search">
      <a-button variant="solid" shape="circle" size="lg">
        <template #icon><SearchOutlined /></template>
      </a-button>
    </a-tooltip>
    <a-tooltip title="Download">
      <a-button variant="outlined" shape="circle">
        <template #icon><DownloadOutlined /></template>
      </a-button>
    </a-tooltip>
    <a-tooltip title="Power off">
      <a-button variant="dashed" shape="circle" danger>
        <template #icon><PoweroffOutlined /></template>
      </a-button>
    </a-tooltip>
    <a-tooltip title="Search">
      <a-button variant="solid">
        <template #icon><SearchOutlined /></template>
        Search
      </a-button>
    </a-tooltip>
  </div>
</template>

<script setup lang="ts">
import SearchOutlined from '@ant-design/icons-vue/SearchOutlined'
import DownloadOutlined from '@ant-design/icons-vue/DownloadOutlined'
import PoweroffOutlined from '@ant-design/icons-vue/PoweroffOutlined'
</script>
