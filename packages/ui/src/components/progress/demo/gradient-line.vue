<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
    <a-progress
      :percent="99.9"
      :stroke-color="{
        '0%': '#108ee9',
        '100%': '#87d068',
      }"
    />
    <a-progress
      :percent="99.9"
      :stroke-color="{
        from: '#108ee9',
        to: '#87d068',
      }"
      status="active"
    />
  </div>
</template>
