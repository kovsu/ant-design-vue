<template>
  <div>
    <p>Content above a dashed divider.</p>
    <a-divider dashed />
    <p>Content between dividers.</p>
    <a-divider :style="{ borderColor: '#7cb305' }" />
    <p>Content below a custom-colored divider.</p>
    <a-divider dashed :style="{ borderColor: '#7cb305' }">Custom Color Dashed</a-divider>
    <p>Content at the bottom.</p>
  </div>
</template>
