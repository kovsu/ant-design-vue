<template>
  <div>
    <a-row>
      <a-col :span="12"><div class="demo-col">col-12</div></a-col>
      <a-col :span="12"><div class="demo-col light">col-12</div></a-col>
    </a-row>
    <a-row>
      <a-col :span="8"><div class="demo-col">col-8</div></a-col>
      <a-col :span="8"><div class="demo-col light">col-8</div></a-col>
      <a-col :span="8"><div class="demo-col">col-8</div></a-col>
    </a-row>
    <a-row>
      <a-col :span="6"><div class="demo-col">col-6</div></a-col>
      <a-col :span="6"><div class="demo-col light">col-6</div></a-col>
      <a-col :span="6"><div class="demo-col">col-6</div></a-col>
      <a-col :span="6"><div class="demo-col light">col-6</div></a-col>
    </a-row>
  </div>
</template>

<style scoped>
.demo-col {
  background: #1677ff;
  color: #fff;
  text-align: center;
  padding: 16px 0;
  border-radius: 0;
}
.demo-col.light {
  background: #1677ffbf;
}
</style>
