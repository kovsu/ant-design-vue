<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <a-alert message="Success Text" type="success" />
    <a-alert message="Info Text" type="info" />
    <a-alert message="Warning Text" type="warning" />
    <a-alert message="Error Text" type="error" />
    <a-alert
      message="Success Text"
      description="Success Description Success Description Success Description"
      type="success"
    />
    <a-alert
      message="Info Text"
      description="Info Description Info Description Info Description"
      type="info"
    />
    <a-alert
      message="Warning Text"
      description="Warning Description Warning Description Warning Description"
      type="warning"
    />
    <a-alert
      message="Error Text"
      description="Error Description Error Description Error Description"
      type="error"
    />
  </div>
</template>
