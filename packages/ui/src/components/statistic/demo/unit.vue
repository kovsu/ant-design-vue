<template>
  <div style="display: flex; gap: 48px;">
    <a-statistic title="Feedback" :value="1128">
      <template #prefix>&#128077;</template>
    </a-statistic>
    <a-statistic title="Unmerged" :value="93" suffix="/ 100">
      <template #prefix>&#128640;</template>
    </a-statistic>
  </div>
</template>
