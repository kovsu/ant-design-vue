<template>
  <div style="display: flex; flex-direction: column; gap: 16px">
    <div>
      <strong>justify: center, align: center</strong>
      <a-flex justify="center" align="center" style="height: 100px; background: #f5f5f5; border-radius: 8px; margin-top: 8px">
        <a-button variant="solid">Centered</a-button>
      </a-flex>
    </div>
    <div>
      <strong>justify: space-between</strong>
      <a-flex justify="space-between" style="background: #f5f5f5; border-radius: 8px; padding: 16px; margin-top: 8px">
        <a-button>Start</a-button>
        <a-button>End</a-button>
      </a-flex>
    </div>
    <div>
      <strong>justify: space-around</strong>
      <a-flex justify="space-around" style="background: #f5f5f5; border-radius: 8px; padding: 16px; margin-top: 8px">
        <a-button>A</a-button>
        <a-button>B</a-button>
        <a-button>C</a-button>
      </a-flex>
    </div>
  </div>
</template>
