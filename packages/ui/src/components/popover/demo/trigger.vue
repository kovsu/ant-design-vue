<template>
  <div style="display: flex; gap: 16px; padding: 40px;">
    <a-popover title="Hover" content="Content on hover">
      <a-button>Hover</a-button>
    </a-popover>
    <a-popover title="Click" trigger="click" content="Content on click">
      <a-button>Click</a-button>
    </a-popover>
    <a-popover title="Focus" trigger="focus" content="Content on focus">
      <a-button>Focus</a-button>
    </a-popover>
  </div>
</template>
