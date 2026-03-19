<template>
  <div>
    <a-divider orientation="left">Align Top</a-divider>
    <a-row justify="center" align="top" style="background: rgba(128, 128, 128, 0.08);">
      <a-col :span="4"><div class="demo-col" style="height: 100px;">col-4</div></a-col>
      <a-col :span="4"><div class="demo-col light" style="height: 50px;">col-4</div></a-col>
      <a-col :span="4"><div class="demo-col" style="height: 120px;">col-4</div></a-col>
      <a-col :span="4"><div class="demo-col light" style="height: 80px;">col-4</div></a-col>
    </a-row>

    <a-divider orientation="left">Align Middle</a-divider>
    <a-row justify="space-around" align="middle" style="background: rgba(128, 128, 128, 0.08);">
      <a-col :span="4"><div class="demo-col" style="height: 100px;">col-4</div></a-col>
      <a-col :span="4"><div class="demo-col light" style="height: 50px;">col-4</div></a-col>
      <a-col :span="4"><div class="demo-col" style="height: 120px;">col-4</div></a-col>
      <a-col :span="4"><div class="demo-col light" style="height: 80px;">col-4</div></a-col>
    </a-row>

    <a-divider orientation="left">Align Bottom</a-divider>
    <a-row justify="space-between" align="bottom" style="background: rgba(128, 128, 128, 0.08);">
      <a-col :span="4"><div class="demo-col" style="height: 100px;">col-4</div></a-col>
      <a-col :span="4"><div class="demo-col light" style="height: 50px;">col-4</div></a-col>
      <a-col :span="4"><div class="demo-col" style="height: 120px;">col-4</div></a-col>
      <a-col :span="4"><div class="demo-col light" style="height: 80px;">col-4</div></a-col>
    </a-row>
  </div>
</template>

<style scoped>
.demo-col {
  background: #1677ff;
  color: #fff;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.demo-col.light {
  background: #1677ffbf;
}
</style>
