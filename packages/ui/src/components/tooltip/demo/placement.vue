<template>
  <div style="display: flex; flex-direction: column; gap: 8px; align-items: center; padding: 60px;">
    <div style="display: flex; gap: 8px; justify-content: center;">
      <a-tooltip placement="topLeft" title="Top Left prompt text">
        <a-button>TL</a-button>
      </a-tooltip>
      <a-tooltip placement="top" title="Top prompt text">
        <a-button>Top</a-button>
      </a-tooltip>
      <a-tooltip placement="topRight" title="Top Right prompt text">
        <a-button>TR</a-button>
      </a-tooltip>
    </div>
    <div style="display: flex; justify-content: space-between; width: 340px;">
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <a-tooltip placement="leftTop" title="Left Top prompt text">
          <a-button>LT</a-button>
        </a-tooltip>
        <a-tooltip placement="left" title="Left prompt text">
          <a-button>Left</a-button>
        </a-tooltip>
        <a-tooltip placement="leftBottom" title="Left Bottom prompt text">
          <a-button>LB</a-button>
        </a-tooltip>
      </div>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <a-tooltip placement="rightTop" title="Right Top prompt text">
          <a-button>RT</a-button>
        </a-tooltip>
        <a-tooltip placement="right" title="Right prompt text">
          <a-button>Right</a-button>
        </a-tooltip>
        <a-tooltip placement="rightBottom" title="Right Bottom prompt text">
          <a-button>RB</a-button>
        </a-tooltip>
      </div>
    </div>
    <div style="display: flex; gap: 8px; justify-content: center;">
      <a-tooltip placement="bottomLeft" title="Bottom Left prompt text">
        <a-button>BL</a-button>
      </a-tooltip>
      <a-tooltip placement="bottom" title="Bottom prompt text">
        <a-button>Bottom</a-button>
      </a-tooltip>
      <a-tooltip placement="bottomRight" title="Bottom Right prompt text">
        <a-button>BR</a-button>
      </a-tooltip>
    </div>
  </div>
</template>
