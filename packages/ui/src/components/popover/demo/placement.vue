<template>
  <div style="display: flex; flex-direction: column; gap: 8px; align-items: center; padding: 60px;">
    <div style="display: flex; gap: 8px; justify-content: center;">
      <a-popover placement="topLeft" title="Title" content="Content">
        <a-button>TL</a-button>
      </a-popover>
      <a-popover placement="top" title="Title" content="Content">
        <a-button>Top</a-button>
      </a-popover>
      <a-popover placement="topRight" title="Title" content="Content">
        <a-button>TR</a-button>
      </a-popover>
    </div>
    <div style="display: flex; justify-content: space-between; width: 340px;">
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <a-popover placement="leftTop" title="Title" content="Content">
          <a-button>LT</a-button>
        </a-popover>
        <a-popover placement="left" title="Title" content="Content">
          <a-button>Left</a-button>
        </a-popover>
        <a-popover placement="leftBottom" title="Title" content="Content">
          <a-button>LB</a-button>
        </a-popover>
      </div>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <a-popover placement="rightTop" title="Title" content="Content">
          <a-button>RT</a-button>
        </a-popover>
        <a-popover placement="right" title="Title" content="Content">
          <a-button>Right</a-button>
        </a-popover>
        <a-popover placement="rightBottom" title="Title" content="Content">
          <a-button>RB</a-button>
        </a-popover>
      </div>
    </div>
    <div style="display: flex; gap: 8px; justify-content: center;">
      <a-popover placement="bottomLeft" title="Title" content="Content">
        <a-button>BL</a-button>
      </a-popover>
      <a-popover placement="bottom" title="Title" content="Content">
        <a-button>Bottom</a-button>
      </a-popover>
      <a-popover placement="bottomRight" title="Title" content="Content">
        <a-button>BR</a-button>
      </a-popover>
    </div>
  </div>
</template>
