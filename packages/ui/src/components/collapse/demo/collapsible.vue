<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <a-collapse collapsible="header" :default-active-key="['1']">
      <a-collapse-panel panel-key="1" header="This panel can only be collapsed by clicking text">
        <p>{{ text }}</p>
      </a-collapse-panel>
    </a-collapse>
    <a-collapse collapsible="icon" :default-active-key="['1']">
      <a-collapse-panel panel-key="1" header="This panel can only be collapsed by clicking icon">
        <p>{{ text }}</p>
      </a-collapse-panel>
    </a-collapse>
    <a-collapse collapsible="disabled">
      <a-collapse-panel panel-key="1" header="This panel can't be collapsed">
        <p>{{ text }}</p>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script setup lang="ts">
const text = 'A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.'
</script>
