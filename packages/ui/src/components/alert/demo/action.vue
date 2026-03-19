<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <a-alert message="Success Tips" type="success" show-icon closable>
      <template #action>
        <a-button size="sm" type="text">UNDO</a-button>
      </template>
    </a-alert>
    <a-alert
      message="Error Text"
      description="Error description for detailed information."
      type="error"
      show-icon
    >
      <template #action>
        <a-button size="sm" danger type="text">Detail</a-button>
      </template>
    </a-alert>
  </div>
</template>
