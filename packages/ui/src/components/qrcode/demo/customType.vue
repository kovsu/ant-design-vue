<template>
  <div style="display: flex; gap: 16px">
    <div>
      <div style="margin-bottom: 8px">Canvas</div>
      <a-q-r-code value="https://ant-design-vue.com" />
    </div>
    <div>
      <div style="margin-bottom: 8px">SVG (via icon)</div>
      <a-q-r-code
        value="https://ant-design-vue.com"
        icon="https://www.antdv.com/assets/logo.1ef800a8.svg"
        :icon-size="40"
        error-level="H"
      />
    </div>
  </div>
</template>
