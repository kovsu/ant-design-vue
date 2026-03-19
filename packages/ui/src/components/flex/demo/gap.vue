<template>
  <div style="display: flex; flex-direction: column; gap: 16px">
    <div>
      <strong>gap: small (8px)</strong>
      <a-flex gap="small" style="margin-top: 8px">
        <a-button variant="solid">1</a-button>
        <a-button variant="solid">2</a-button>
        <a-button variant="solid">3</a-button>
      </a-flex>
    </div>
    <div>
      <strong>gap: middle (16px)</strong>
      <a-flex gap="middle" style="margin-top: 8px">
        <a-button variant="solid">1</a-button>
        <a-button variant="solid">2</a-button>
        <a-button variant="solid">3</a-button>
      </a-flex>
    </div>
    <div>
      <strong>gap: large (32px)</strong>
      <a-flex gap="large" style="margin-top: 8px">
        <a-button variant="solid">1</a-button>
        <a-button variant="solid">2</a-button>
        <a-button variant="solid">3</a-button>
      </a-flex>
    </div>
  </div>
</template>
