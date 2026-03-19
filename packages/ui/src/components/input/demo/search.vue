<template>
  <div style="display: flex; flex-direction: column; gap: 12px; max-width: 400px">
    <a-input-search placeholder="Search..." />
    <a-input-search placeholder="With button" :enter-button="true" />
    <a-input-search placeholder="Custom button text" enter-button="Go" />
    <a-input-search placeholder="Loading" :loading="true" :enter-button="true" />
  </div>
</template>
