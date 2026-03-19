<template>
  <div>
    <a-divider orientation="left">Normal</a-divider>
    <a-row>
      <a-col :span="6" :order="4"><div class="demo-col">1 col-order-4</div></a-col>
      <a-col :span="6" :order="3"><div class="demo-col light">2 col-order-3</div></a-col>
      <a-col :span="6" :order="2"><div class="demo-col">3 col-order-2</div></a-col>
      <a-col :span="6" :order="1"><div class="demo-col light">4 col-order-1</div></a-col>
    </a-row>
    <a-divider orientation="left">Responsive</a-divider>
    <a-row>
      <a-col :span="6" :xs="{ order: 1 }" :sm="{ order: 2 }" :md="{ order: 3 }" :lg="{ order: 4 }">
        <div class="demo-col">1 col-order-responsive</div>
      </a-col>
      <a-col :span="6" :xs="{ order: 2 }" :sm="{ order: 1 }" :md="{ order: 4 }" :lg="{ order: 3 }">
        <div class="demo-col light">2 col-order-responsive</div>
      </a-col>
      <a-col :span="6" :xs="{ order: 3 }" :sm="{ order: 4 }" :md="{ order: 2 }" :lg="{ order: 2 }">
        <div class="demo-col">3 col-order-responsive</div>
      </a-col>
      <a-col :span="6" :xs="{ order: 4 }" :sm="{ order: 3 }" :md="{ order: 1 }" :lg="{ order: 1 }">
        <div class="demo-col light">4 col-order-responsive</div>
      </a-col>
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
.demo-col.light {
  background: #1677ffbf;
}
</style>
