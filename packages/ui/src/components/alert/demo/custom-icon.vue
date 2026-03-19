<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <a-alert message="showIcon = false" type="success">
      <template #icon><span style="font-size: 14px;">&#9786;</span></template>
    </a-alert>
    <a-alert message="Success Tips" type="success" show-icon>
      <template #icon><span style="font-size: 14px;">&#9786;</span></template>
    </a-alert>
    <a-alert message="Informational Notes" type="info" show-icon>
      <template #icon><span style="font-size: 14px;">&#9786;</span></template>
    </a-alert>
    <a-alert message="Warning" type="warning" show-icon>
      <template #icon><span style="font-size: 14px;">&#9786;</span></template>
    </a-alert>
    <a-alert message="Error" type="error" show-icon>
      <template #icon><span style="font-size: 14px;">&#9786;</span></template>
    </a-alert>
    <a-alert
      message="Success Tips"
      description="Detailed description and advices about successful copywriting."
      type="success"
      show-icon
    >
      <template #icon><span style="font-size: 24px;">&#9786;</span></template>
    </a-alert>
    <a-alert
      message="Informational Notes"
      description="Additional description and information about copywriting."
      type="info"
      show-icon
    >
      <template #icon><span style="font-size: 24px;">&#9786;</span></template>
    </a-alert>
    <a-alert
      message="Warning"
      description="This is a warning notice about copywriting."
      type="warning"
      show-icon
    >
      <template #icon><span style="font-size: 24px;">&#9786;</span></template>
    </a-alert>
    <a-alert
      message="Error"
      description="This is an error message about copywriting."
      type="error"
      show-icon
    >
      <template #icon><span style="font-size: 24px;">&#9786;</span></template>
    </a-alert>
  </div>
</template>
