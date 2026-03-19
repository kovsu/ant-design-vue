# @ant-design-vue/ui Refactor Plan

## Core Decisions

| Decision | Choice |
|----------|--------|
| Package name | `@ant-design-vue/ui` (new package) |
| Component style | SFC `<script setup lang="ts">` |
| Styling | CSS files + CSS variables, Tailwind dev-time only, output pure CSS |
| Theme | CSS variables + `@ant-design/colors` palette generation |
| Floating/Popup | `@floating-ui/vue` replaces all vc-trigger/vc-dialog |
| API compat | Plan C: high-frequency props compatible, low-frequency dropped |
| v-model | `v-model:value` (antd-vue convention) |
| Types | `types.ts` per component |
| SSR | Must be safe, no browser API at top-level |

## Execution Batches

Status: `[ ]` todo · `[~]` in progress · `[x]` done

### Done

| Batch | Scope | Status |
|-------|-------|--------|
| Foundation | Theme, ConfigProvider (basic), Wave, useConfigInject, base.css, utils | [x] #8494 |
| Button | Button + ButtonGroup | [x] #8495 |
| Flex / Affix / Divider | Flex rewrite, Affix bugfix, Divider new | [x] |
| Dev infra | Dev server, demos, demo snapshot tests | [x] |
| Batch 1 | Row+Col, Space+SpaceCompact, Layout+Header+Footer+Content+Sider, useBreakpoint hook | [x] |
| Batch 2 | TypographyText, TypographyTitle, TypographyParagraph, TypographyLink (ellipsis CSS, copyable, decorations) | [x] |
| Batch 3 | Alert, Empty, Result, Spin, Skeleton (+ sub-components), Progress (line/circle/dashboard/steps) | [x] |
| A11y pass | ARIA roles, keyboard, screen reader support across all Batch 0–3 components | [x] |
| Batch 4 | Tag+CheckableTag, Badge+Ribbon, Avatar+AvatarGroup, Statistic+Countdown | [x] |

### ~~Batch 2: Typography~~ (done)
> 文本组件家族，互相共享 ellipsis/copyable/editable 逻辑

| Component | Scope |
|-----------|-------|
| Text + Title + Paragraph + Link | copyable, ellipsis (单行/多行), editable, 各级标题 |

### Batch 3: Simple Feedback & Status
> 简单展示组件，无弹出层依赖，可以一口气写完

| Component | Scope |
|-----------|-------|
| Alert | 四种类型，closable，banner 模式，showIcon |
| Empty | 内置/自定义图片描述 |
| Result | 状态页 (success/error/info/warning/404/403/500) |
| Spin | 加载中，嵌套容器模式，tip |
| Skeleton | 占位骨架，avatar/title/paragraph，active 动画 |
| Progress | 进度条 (line/circle/dashboard)，steps 分段 |

### Batch 4: Data Atoms
> 小型数据展示元素，经常一起使用

| Component | Scope |
|-----------|-------|
| Tag + CheckableTag | 颜色，closable，bordered |
| Badge + Ribbon | 计数，dot，status，自定义颜色 |
| Avatar + AvatarGroup | 图片/图标/文字，size，shape，group maxCount |
| Statistic + Countdown | 数值展示，前缀后缀，倒计时 |

### Batch 5: Content Containers
> 内容容器 + 序列展示组件

| Component | Scope |
|-----------|-------|
| Card + CardMeta + CardGrid | 标题/封面/操作栏，loading，hoverable |
| Collapse + CollapsePanel | 手风琴，ghost，可嵌套 |
| Descriptions + DescriptionsItem | 键值对描述列表，响应式列数 |
| Timeline + TimelineItem | 时间轴，交替/右侧模式，自定义 dot |
| Steps + Step | 步骤条，vertical，dot 模式，可点击 |
| Breadcrumb + BreadcrumbItem | 面包屑导航，separator，路由集成 |

### Batch 6: Basic Form Controls
> 基础表单控件，Form 的前置依赖，互相不依赖弹出层

| Component | Scope |
|-----------|-------|
| Input + TextArea + Password + Search + InputGroup | v-model:value, prefix/suffix/addon, allowClear, showCount |
| InputNumber | step, precision, formatter/parser, 键盘操作 |
| Checkbox + CheckboxGroup | v-model, indeterminate, group 全选 |
| Radio + RadioGroup + RadioButton | v-model, button 样式，size |
| Switch | v-model, loading, checkedChildren/unCheckedChildren |
| Rate | v-model, half, character, count, allowClear |
| Slider | v-model, range, vertical, marks, step, tooltip |

### Batch 7: Trigger Infra + Tooltip Family
> 弹出层基础设施 + 第一批消费者，必须一起做才能验证

| Component | Scope |
|-----------|-------|
| _internal/trigger | floating-ui 包装，placement, arrow, flip/shift |
| _internal/portal | Teleport + getPopupContainer |
| Tooltip | 基础 tooltip |
| Popover | 标题+内容的 tooltip |
| Popconfirm | 确认气泡 |

### Batch 8: Dropdown & Menu
> 紧密关联——Dropdown 的弹出层就是 Menu

| Component | Scope |
|-----------|-------|
| Dropdown + DropdownButton | 下拉菜单，placement，trigger |
| Menu + SubMenu + MenuItem + MenuItemGroup | 水平/垂直/内联，折叠，SubMenu 弹出 |

### Batch 9: Modal Family
> 面板覆盖层 + 命令式反馈——共享 portal 和动画模式

| Component | Scope |
|-----------|-------|
| Modal | 对话框 + confirm/info/success/error/warning |
| Drawer | 抽屉，四方向，嵌套 |
| Message | 命令式消息，全局配置 |
| Notification | 命令式通知，placement |

### Batch 10: Navigation Controls
> 导航组件

| Component | Scope |
|-----------|-------|
| Tabs + TabPane | 卡片/线条样式，可编辑，extra，居中 |
| Pagination | 简洁/完整，pageSize，showTotal |
| Anchor + AnchorLink | 锚点导航，affix，targetOffset |

### Batch 11: Select Family
> 都依赖 trigger + virtual-list，交互模式相似

| Component | Scope |
|-----------|-------|
| _internal/virtual-list | 虚拟滚动 |
| Select + Option + OptGroup | 搜索/多选/tags/分组，virtual scroll |
| AutoComplete | 输入建议 |
| Mentions | @提及 |
| Cascader | 级联选择，搜索，loadData |
| TreeSelect | 树选择，checkable |

### Batch 12: Tree
> 大型虚拟滚动组件，单独一批

| Component | Scope |
|-----------|-------|
| Tree + DirectoryTree | checkable, draggable, virtual scroll, 异步加载 |

### Batch 13: Date & Time
> 日期时间家族，共享 panel/picker 逻辑

| Component | Scope |
|-----------|-------|
| DatePicker + RangePicker | 日/周/月/季/年，presets |
| TimePicker | 时间选择 |
| Calendar | 日历面板 |

### Batch 14: Remaining Input & Display
> 剩余的输入组件和展示组件

| Component | Scope |
|-----------|-------|
| Transfer | 穿梭框，搜索，树穿梭 |
| Upload + Dragger | 文件上传，拖拽，图片墙 |
| Image + ImagePreviewGroup | 图片预览，多图预览 |
| List + ListItem + ListItemMeta | 列表，加载更多，虚拟列表 |
| Carousel | 走马灯 |
| Segmented | 分段控制器 |

### Batch 15: Utility & Misc
> 工具型组件

| Component | Scope |
|-----------|-------|
| QRCode | 二维码生成 |
| Watermark | 水印 |
| FloatButton + FloatButtonGroup + BackTop | 悬浮按钮 |
| Tour | 漫游指引 |

### Batch 16: Form + Integration
> 最后收尾——Form 需要所有表单控件就位，ConfigProvider/App 做全局整合

| Component | Scope |
|-----------|-------|
| Form + FormItem | 表单验证 (async-validator)，layout，rules |
| App | 提供 message/notification/modal 上下文 |
| ConfigProvider (full) | locale，componentSize，component-level config |

## Dependency Graph

```
Foundation (done)
└── All components depend on Theme + useConfigInject

_internal/trigger (Batch 7)
├── Tooltip → Popover, Popconfirm (Batch 7)
├── Dropdown, Menu submenu (Batch 8)
├── Select, Cascader, TreeSelect, AutoComplete, Mentions (Batch 11)
├── DatePicker, TimePicker (Batch 13)
└── Tour (Batch 15)

_internal/portal (Batch 7)
├── Modal, Drawer (Batch 9)
├── Message, Notification (Batch 9)
└── Image preview (Batch 14)

_internal/virtual-list (Batch 11)
├── Select (Batch 11), Table (N/A)
├── Tree (Batch 12), TreeSelect (Batch 11)
└── Cascader (Batch 11)

Batch order constraints:
  Batch 1-6  → independent, can go in any order
  Batch 7    → before 8, 9, 10, 11, 13, 15
  Batch 11   → before 12 (virtual-list shared)
  Batch 6    → before 16 (Form needs controls)
  Batch 16   → last
```
