<template>
  <a-result
    status="error"
    title="Submission Failed"
    sub-title="Please check and modify the following information before resubmitting."
  >
    <template #extra>
      <a-button type="primary">Go Console</a-button>
      <a-button>Buy Again</a-button>
    </template>
    <div class="desc">
      <p style="font-size: 16px;">
        <strong>The content you submitted has the following error:</strong>
      </p>
      <p>Your account has been frozen.</p>
      <p>Your account is not yet eligible to apply.</p>
    </div>
  </a-result>
</template>
