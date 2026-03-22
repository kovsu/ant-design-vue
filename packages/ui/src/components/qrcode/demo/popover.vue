<template>
  <a-popover>
    <template #content>
      <a-q-r-code value="https://ant-design-vue.com" :bordered="false" />
    </template>
    <a-button>Hover to see QR Code</a-button>
  </a-popover>
</template>
