<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px">
    <a-input-number status="error" style="width: 100%" />
    <a-input-number status="warning" style="width: 100%" />
    <a-input-number status="error" style="width: 100%">
      <template #prefix>$</template>
    </a-input-number>
    <a-input-number status="warning" style="width: 100%">
      <template #prefix>$</template>
    </a-input-number>
  </div>
</template>
