<template>
  <a-collapse :bordered="false" :default-active-key="['1']">
    <a-collapse-panel panel-key="1" header="This is panel header 1">
      <p>A dog is a type of domesticated animal. Known for its loyalty and faithfulness.</p>
    </a-collapse-panel>
    <a-collapse-panel panel-key="2" header="This is panel header 2">
      <p>A dog is a type of domesticated animal. Known for its loyalty and faithfulness.</p>
    </a-collapse-panel>
    <a-collapse-panel panel-key="3" header="This is panel header 3" collapsible="disabled">
      <p>This panel is disabled and cannot be toggled.</p>
    </a-collapse-panel>
  </a-collapse>
</template>
