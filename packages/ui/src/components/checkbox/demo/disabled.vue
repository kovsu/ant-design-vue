<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <a-checkbox disabled>Disabled</a-checkbox>
    <a-checkbox disabled checked>Disabled Checked</a-checkbox>
    <a-checkbox-group
      disabled
      :value="['Apple']"
      :options="['Apple', 'Pear', 'Orange']"
    />
  </div>
</template>
