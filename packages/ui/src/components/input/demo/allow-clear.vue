<template>
  <div style="display: flex; flex-direction: column; gap: 12px; max-width: 400px">
    <a-input placeholder="Type and clear" :allow-clear="true" value="Clearable text" />
    <a-input placeholder="With prefix and clear" :allow-clear="true">
      <template #prefix>$</template>
    </a-input>
  </div>
</template>
