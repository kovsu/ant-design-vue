<template>
  <div style="display: flex; flex-direction: column; gap: 12px; max-width: 400px">
    <a-input placeholder="Error status" status="error" />
    <a-input placeholder="Warning status" status="warning" />
    <a-input placeholder="Error with prefix" status="error">
      <template #prefix>!</template>
    </a-input>
  </div>
</template>
