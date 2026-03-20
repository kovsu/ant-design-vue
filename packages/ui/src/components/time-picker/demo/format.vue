<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 200px">
    <a-time-picker format="HH:mm" :show-second="false" placeholder="HH:mm" />
    <a-time-picker :use12-hours="true" placeholder="12-hour" />
    <a-time-picker
      :hour-step="2"
      :minute-step="15"
      :second-step="30"
      placeholder="With steps"
    />
  </div>
</template>
