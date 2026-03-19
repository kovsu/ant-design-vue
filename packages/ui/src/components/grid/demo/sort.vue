<template>
  <a-row>
    <a-col :span="18" :push="6"><div class="demo-col">col-18 col-push-6</div></a-col>
    <a-col :span="6" :pull="18"><div class="demo-col light">col-6 col-pull-18</div></a-col>
  </a-row>
</template>

<style scoped>
.demo-col {
  background: #1677ff;
  color: #fff;
  text-align: center;
  padding: 16px 0;
}
.demo-col.light {
  background: #1677ffbf;
}
</style>
