<template>
  <div>
    <p><strong>Flex layout</strong></p>
    <a-row>
      <a-col :flex="2"><div class="demo-col">2 / 5</div></a-col>
      <a-col :flex="3"><div class="demo-col light">3 / 5</div></a-col>
    </a-row>
    <br />
    <a-row>
      <a-col flex="100px"><div class="demo-col">100px</div></a-col>
      <a-col flex="auto"><div class="demo-col light">auto</div></a-col>
    </a-row>
    <br />
    <a-row>
      <a-col flex="1 1 200px"><div class="demo-col">1 1 200px</div></a-col>
      <a-col flex="0 1 300px"><div class="demo-col light">0 1 300px</div></a-col>
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
