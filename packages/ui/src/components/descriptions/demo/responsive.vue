<template>
  <div>
    <a-descriptions title="Responsive Layout" :column="2" bordered>
      <a-descriptions-item label="Product">Cloud Database</a-descriptions-item>
      <a-descriptions-item label="Billing Mode">Prepaid</a-descriptions-item>
      <a-descriptions-item label="Automatic Renewal">YES</a-descriptions-item>
      <a-descriptions-item label="Order time">2024-01-01 12:00:00</a-descriptions-item>
      <a-descriptions-item label="Usage Info" :span="2">
        February - March 2024
      </a-descriptions-item>
    </a-descriptions>
    <div style="margin-top: 24px;" />
    <a-descriptions title="Single Column" :column="1" bordered>
      <a-descriptions-item label="Product">Cloud Database</a-descriptions-item>
      <a-descriptions-item label="Billing Mode">Prepaid</a-descriptions-item>
      <a-descriptions-item label="Order time">2024-01-01 12:00:00</a-descriptions-item>
    </a-descriptions>
  </div>
</template>
