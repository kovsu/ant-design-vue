<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <a-alert message="Success Text" type="success">
      <template #description>
        <p>
          Success Description
          <span style="color: red;">Success</span>
          Description Success Description
        </p>
      </template>
    </a-alert>
    <a-alert
      message="Info Text"
      description="Info Description Info Description Info Description Info Description"
      type="info"
    />
    <a-alert
      message="Warning Text"
      description="Warning Description Warning Description Warning Description Warning Description"
      type="warning"
    />
    <a-alert
      message="Error Text"
      description="Error Description Error Description Error Description Error Description"
      type="error"
    />
  </div>
</template>
