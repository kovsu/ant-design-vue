<template>
  <div>
    <p><strong>Horizontal gutter: 16</strong></p>
    <a-row :gutter="16">
      <a-col :span="6"><div class="demo-col">col-6</div></a-col>
      <a-col :span="6"><div class="demo-col">col-6</div></a-col>
      <a-col :span="6"><div class="demo-col">col-6</div></a-col>
      <a-col :span="6"><div class="demo-col">col-6</div></a-col>
    </a-row>
    <br />
    <p><strong>Horizontal + Vertical gutter: [16, 24]</strong></p>
    <a-row :gutter="[16, 24]">
      <a-col :span="6"><div class="demo-col">col-6</div></a-col>
      <a-col :span="6"><div class="demo-col">col-6</div></a-col>
      <a-col :span="6"><div class="demo-col">col-6</div></a-col>
      <a-col :span="6"><div class="demo-col">col-6</div></a-col>
      <a-col :span="6"><div class="demo-col">col-6</div></a-col>
      <a-col :span="6"><div class="demo-col">col-6</div></a-col>
      <a-col :span="6"><div class="demo-col">col-6</div></a-col>
      <a-col :span="6"><div class="demo-col">col-6</div></a-col>
    </a-row>
  </div>
</template>

<style scoped>
.demo-col {
  background: #1677ff;
  color: #fff;
  text-align: center;
  padding: 16px 0;
}
</style>
