<template>
  <a-watermark
    content="Custom Watermark"
    :font="{ color: 'rgba(255, 0, 0, 0.15)', fontSize: 20 }"
    :rotate="-30"
    :gap="[150, 150]"
  >
    <div style="height: 300px; display: flex; align-items: center; justify-content: center">
      <p style="color: rgba(0, 0, 0, 0.45)">Custom font and rotation</p>
    </div>
  </a-watermark>
</template>
