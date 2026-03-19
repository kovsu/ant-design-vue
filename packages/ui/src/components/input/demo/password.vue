<template>
  <div style="display: flex; flex-direction: column; gap: 12px; max-width: 400px">
    <a-input-password placeholder="Enter password" />
    <a-input-password placeholder="No toggle" :visibility-toggle="false" />
  </div>
</template>
