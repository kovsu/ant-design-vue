<template>
  <a-steps>
    <a-step title="Login" status="finish">
      <template #icon><span style="font-size: 18px;">&#x1F464;</span></template>
    </a-step>
    <a-step title="Verification" status="finish">
      <template #icon><span style="font-size: 18px;">&#x1F4DD;</span></template>
    </a-step>
    <a-step title="Pay" status="process">
      <template #icon><span style="font-size: 18px;">&#x1F4B3;</span></template>
    </a-step>
    <a-step title="Done" status="wait">
      <template #icon><span style="font-size: 18px;">&#x1F604;</span></template>
    </a-step>
  </a-steps>
</template>
