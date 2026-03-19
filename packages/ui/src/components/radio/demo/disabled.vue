<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <a-radio disabled>Disabled</a-radio>
    <a-radio disabled checked>Disabled Checked</a-radio>

    <a-radio-group disabled value="a">
      <a-radio value="a">A</a-radio>
      <a-radio value="b">B</a-radio>
      <a-radio value="c">C</a-radio>
    </a-radio-group>

    <a-radio-group disabled value="a" button-style="solid">
      <a-radio-button value="a">Hangzhou</a-radio-button>
      <a-radio-button value="b">Shanghai</a-radio-button>
      <a-radio-button value="c">Beijing</a-radio-button>
    </a-radio-group>
  </div>
</template>
