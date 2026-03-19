<template>
  <div style="display: flex; flex-direction: column; gap: 12px; max-width: 400px">
    <a-input placeholder="mysite">
      <template #addonBefore>https://</template>
      <template #addonAfter>.com</template>
    </a-input>
    <a-input placeholder="Enter amount">
      <template #prefix>$</template>
      <template #suffix>USD</template>
    </a-input>
    <a-input placeholder="With prefix and addon">
      <template #addonBefore>Site</template>
      <template #prefix>@</template>
    </a-input>
  </div>
</template>
