<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <a-alert message="Warning text" banner />
    <a-alert message="Info text" type="info" banner closable />
    <a-alert message="Error text" type="error" banner show-icon />
  </div>
</template>
