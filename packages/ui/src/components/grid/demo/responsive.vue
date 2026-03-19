<template>
  <a-row>
    <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="10"><div class="demo-col">Col</div></a-col>
    <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="4"><div class="demo-col light">Col</div></a-col>
    <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="10"><div class="demo-col">Col</div></a-col>
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
