<template>
  <a-collapse default-active-key="1">
    <a-collapse-panel panel-key="1" header="This is panel header 1">
      <template #extra>
        <span style="cursor: pointer;" @click.stop>&#9881;</span>
      </template>
      <p>A dog is a type of domesticated animal. Known for its loyalty and faithfulness.</p>
    </a-collapse-panel>
    <a-collapse-panel panel-key="2" header="This is panel header 2">
      <template #extra>
        <span style="cursor: pointer;" @click.stop>&#9881;</span>
      </template>
      <p>A dog is a type of domesticated animal. Known for its loyalty and faithfulness.</p>
    </a-collapse-panel>
    <a-collapse-panel panel-key="3" header="This is panel header 3">
      <template #extra>
        <span style="cursor: pointer;" @click.stop>&#9881;</span>
      </template>
      <p>A dog is a type of domesticated animal. Known for its loyalty and faithfulness.</p>
    </a-collapse-panel>
  </a-collapse>
</template>
