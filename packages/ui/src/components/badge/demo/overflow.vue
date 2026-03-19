<template>
  <div style="display: flex; gap: 24px; align-items: center;">
    <a-badge :count="99">
      <div style="width: 42px; height: 42px; background: #ebebeb; border-radius: 6px;" />
    </a-badge>
    <a-badge :count="100">
      <div style="width: 42px; height: 42px; background: #ebebeb; border-radius: 6px;" />
    </a-badge>
    <a-badge :count="99" :overflow-count="10">
      <div style="width: 42px; height: 42px; background: #ebebeb; border-radius: 6px;" />
    </a-badge>
    <a-badge :count="1000" :overflow-count="999">
      <div style="width: 42px; height: 42px; background: #ebebeb; border-radius: 6px;" />
    </a-badge>
  </div>
</template>
