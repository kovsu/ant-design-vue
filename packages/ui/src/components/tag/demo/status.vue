<template>
  <div>
    <a-divider orientation="left">Without icon</a-divider>
    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
      <a-tag color="success">success</a-tag>
      <a-tag color="processing">processing</a-tag>
      <a-tag color="error">error</a-tag>
      <a-tag color="warning">warning</a-tag>
      <a-tag color="default">default</a-tag>
    </div>
    <a-divider orientation="left">With icon</a-divider>
    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
      <a-tag color="success">
        <template #icon><span>&#10004;</span></template>
        success
      </a-tag>
      <a-tag color="processing">
        <template #icon><span>&#8635;</span></template>
        processing
      </a-tag>
      <a-tag color="error">
        <template #icon><span>&#10006;</span></template>
        error
      </a-tag>
      <a-tag color="warning">
        <template #icon><span>&#9888;</span></template>
        warning
      </a-tag>
      <a-tag color="default">
        <template #icon><span>&#9201;</span></template>
        waiting
      </a-tag>
      <a-tag color="default">
        <template #icon><span>&#9724;</span></template>
        stop
      </a-tag>
    </div>
  </div>
</template>
