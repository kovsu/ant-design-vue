<template>
  <div style="display: flex; flex-direction: column; gap: 16px">
    <a-date-picker placeholder="Date with footer">
      <template #renderExtraFooter>extra footer</template>
    </a-date-picker>
    <a-date-picker show-time placeholder="DateTime with footer">
      <template #renderExtraFooter>extra footer</template>
    </a-date-picker>
    <a-range-picker>
      <template #renderExtraFooter>extra footer</template>
    </a-range-picker>
    <a-range-picker show-time>
      <template #renderExtraFooter>extra footer</template>
    </a-range-picker>
    <a-date-picker placeholder="Month with footer" picker="month">
      <template #renderExtraFooter>extra footer</template>
    </a-date-picker>
  </div>
</template>

<script setup lang="ts">
</script>
