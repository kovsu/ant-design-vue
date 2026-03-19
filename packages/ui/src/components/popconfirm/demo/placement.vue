<template>
  <div style="display: flex; flex-direction: column; gap: 8px; align-items: center; padding: 60px;">
    <div style="display: flex; gap: 8px; justify-content: center;">
      <a-popconfirm placement="topLeft" title="Are you sure?">
        <a-button>TL</a-button>
      </a-popconfirm>
      <a-popconfirm placement="top" title="Are you sure?">
        <a-button>Top</a-button>
      </a-popconfirm>
      <a-popconfirm placement="topRight" title="Are you sure?">
        <a-button>TR</a-button>
      </a-popconfirm>
    </div>
    <div style="display: flex; justify-content: space-between; width: 340px;">
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <a-popconfirm placement="leftTop" title="Are you sure?">
          <a-button>LT</a-button>
        </a-popconfirm>
        <a-popconfirm placement="left" title="Are you sure?">
          <a-button>Left</a-button>
        </a-popconfirm>
        <a-popconfirm placement="leftBottom" title="Are you sure?">
          <a-button>LB</a-button>
        </a-popconfirm>
      </div>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <a-popconfirm placement="rightTop" title="Are you sure?">
          <a-button>RT</a-button>
        </a-popconfirm>
        <a-popconfirm placement="right" title="Are you sure?">
          <a-button>Right</a-button>
        </a-popconfirm>
        <a-popconfirm placement="rightBottom" title="Are you sure?">
          <a-button>RB</a-button>
        </a-popconfirm>
      </div>
    </div>
    <div style="display: flex; gap: 8px; justify-content: center;">
      <a-popconfirm placement="bottomLeft" title="Are you sure?">
        <a-button>BL</a-button>
      </a-popconfirm>
      <a-popconfirm placement="bottom" title="Are you sure?">
        <a-button>Bottom</a-button>
      </a-popconfirm>
      <a-popconfirm placement="bottomRight" title="Are you sure?">
        <a-button>BR</a-button>
      </a-popconfirm>
    </div>
  </div>
</template>
