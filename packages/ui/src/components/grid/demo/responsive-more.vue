<template>
  <a-row>
    <a-col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }">
      <div class="demo-col">Col</div>
    </a-col>
    <a-col :xs="{ span: 11, offset: 1 }" :lg="{ span: 6, offset: 2 }">
      <div class="demo-col">Col</div>
    </a-col>
    <a-col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }">
      <div class="demo-col">Col</div>
    </a-col>
  </a-row>
</template>

<style scoped>
.demo-col {
  background: #1677ff;
  color: #fff;
  text-align: center;
  padding: 16px 0;
  margin-top: 8px;
}
</style>
