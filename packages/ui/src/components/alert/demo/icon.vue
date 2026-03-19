<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <a-alert message="Success Tips" type="success" show-icon />
    <a-alert message="Informational Notes" type="info" show-icon />
    <a-alert message="Warning" type="warning" show-icon />
    <a-alert message="Error" type="error" show-icon />
    <a-alert
      message="Success Tips"
      description="Detailed description and advices about successful copywriting."
      type="success"
      show-icon
    />
  </div>
</template>
