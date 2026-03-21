# 从 ant-design-vue 4.x 迁移到 @ant-design-vue/ui

本指南列出所有 Breaking Changes，帮助你从 `ant-design-vue` 4.x 迁移到全新的 `@ant-design-vue/ui`。

---

## 1. 包名变更

```diff
- npm install ant-design-vue
+ npm install @ant-design-vue/ui
```

```diff
- import { Button, Modal } from 'ant-design-vue'
- import 'ant-design-vue/dist/antd.css'
+ import { Button, Modal } from '@ant-design-vue/ui'
+ import '@ant-design-vue/ui/style.css'
```

全局注册：

```diff
- import Antd from 'ant-design-vue'
- app.use(Antd)
+ import AntdUI from '@ant-design-vue/ui'
+ app.use(AntdUI)
```

---

## 2. 样式系统重构（CSS-in-JS → CSS 文件）

这是影响最大的 Breaking Change。

### 移除的 API

| 移除项 | 说明 |
|--------|------|
| `StyleProvider` | 不再需要，已移除 |
| `useToken()` | CSS-in-JS token hook，已移除 |
| `theme.useToken()` | 同上 |
| `theme.defaultAlgorithm` / `theme.darkAlgorithm` | 已移除，改用 CSS 变量 |
| `ConfigProvider` 的 `theme` prop | 不再接受 token 配置对象 |
| 组件的 `prefixCls` prop | 内部实现细节，已移除 |
| 所有 `.less` 文件引用 | 样式已改为纯 CSS |

### 新的主题定制方式

旧版通过 JS token 定制主题：

```vue
<!-- ❌ 不再支持 -->
<ConfigProvider :theme="{ token: { colorPrimary: '#1677ff' } }">
```

新版通过 CSS 变量定制：

```css
/* ✅ 新方式：覆盖 CSS 变量 */
:root {
  --color-accent: #1677ff;
  --color-accent-hover: #4096ff;
  --color-accent-active: #0958d9;
  --ant-border-radius: 6px;
  --ant-font-size: 14px;
  --ant-motion-duration: 0.2s;
}
```

暗色模式改为在根元素上添加 `.dark-theme` 类名：

```html
<div class="dark-theme">
  <App />
</div>
```

### 主要 CSS 变量

```
--color-accent              主色
--color-accent-hover        主色悬停态
--color-accent-active       主色激活态
--color-accent-content      主色上的文字色
--color-error               错误色
--color-warning             警告色
--color-success             成功色
--color-info                信息色
--color-neutral             文字色
--color-neutral-secondary   次要文字色
--color-neutral-disabled    禁用文字色
--color-neutral-border      边框色
--color-neutral-bg          背景色
--ant-border-radius         圆角
--ant-font-size             字号
--ant-motion-duration       动画时长
```

---

## 3. 移除的组件

| 组件 | 替代方案 |
|------|----------|
| `Comment` | 已移除，请自行实现或使用社区方案 |
| `PageHeader` | 已移除，请自行实现或使用社区方案 |
| `LocaleProvider` | 使用 `ConfigProvider` 的 locale 功能替代 |
| `BreadcrumbSeparator` | 已移除，通过 `Breadcrumb` 的 `separator` prop 或 slot 自定义 |

---

## 4. 属性重命名

### 4.1 `visible` → `open`（影响多个组件）

以下组件的可见性控制 prop 统一从 `visible` 改为 `open`：

| 组件 | 旧 prop | 新 prop |
|------|---------|---------|
| Modal | `v-model:visible` | `v-model:open` |
| Drawer | `v-model:visible` | `v-model:open` |
| Tooltip | `v-model:visible` | `v-model:open` |
| Popover | `v-model:visible` | `v-model:open` |
| Popconfirm | `v-model:visible` | `v-model:open` |
| Dropdown | `v-model:visible` | `v-model:open` |
| Tag | `visible` | 已移除，使用 `v-if` 控制 |

```diff
- <Modal v-model:visible="show" />
+ <Modal v-model:open="show" />

- <Drawer v-model:visible="show" />
+ <Drawer v-model:open="show" />

- <Tooltip v-model:visible="show" />
+ <Tooltip v-model:open="show" />
```

> **过渡期**：`visible` 在当前版本仍可使用但会触发 deprecation 警告，将在下一个大版本移除。

### 4.2 事件重命名

| 组件 | 旧事件 | 新事件 |
|------|--------|--------|
| Tooltip / Popover / Popconfirm | `@visibleChange` | `@openChange` |
| Dropdown | `@visibleChange` | `@openChange` |
| Drawer | `@afterVisibleChange` | `@afterOpenChange` |

```diff
- <Tooltip @visibleChange="handler" />
+ <Tooltip @openChange="handler" />

- <Drawer @afterVisibleChange="handler" />
+ <Drawer @afterOpenChange="handler" />
```

### 4.3 `dropdownClassName` → `popupClassName`

| 组件 | 旧 prop | 新 prop |
|------|---------|---------|
| Select | `dropdownClassName` | `popupClassName` |
| TreeSelect | `dropdownClassName` | `popupClassName` |
| Cascader | `dropdownClassName` | `popupClassName` |
| AutoComplete | `dropdownClassName` | `popupClassName` |

```diff
- <Select dropdownClassName="my-dropdown" />
+ <Select popupClassName="my-dropdown" />
```

---

## 5. Button 变更

### `type` → `variant`

Button 的 `type` prop 已废弃，改用语义更清晰的 `variant`：

| 旧 `type` 值 | 新 `variant` 值 |
|---------------|-----------------|
| `primary` | `solid` |
| `default` | `outlined` |
| `dashed` | `dashed` |
| `text` | `text` |
| `link` | `link` |
| — | `filled`（新增） |

```diff
- <Button type="primary">提交</Button>
+ <Button variant="solid">提交</Button>
```

> **过渡期**：`type` prop 仍可使用，会自动映射到对应 `variant`。

### `size` 值变更

| 旧值 | 新值 |
|------|------|
| `large` | `lg` |
| `middle` | `md` |
| `small` | `sm` |

```diff
- <Button size="large" />
+ <Button size="lg" />
```

> **过渡期**：旧的 size 值仍可使用，会自动映射。

---

## 6. Form 变更

### `hideRequiredMark` → `requiredMark`

```diff
- <Form hideRequiredMark />
+ <Form :requiredMark="false" />
```

`requiredMark` 支持 `boolean | 'optional'`，比旧 prop 更灵活。

### ConfigProvider 全局表单配置

新增通过 `ConfigProvider` 统一配置表单行为：

```vue
<ConfigProvider :form="{ requiredMark: 'optional', colon: false }">
  <App />
</ConfigProvider>
```

---

## 7. Progress 变更

| 旧 prop | 新 prop | 示例 |
|---------|---------|------|
| `width` | `size` | `<Progress :size="120" />` |
| `successPercent` | `success` | `<Progress :success="{ percent: 30 }" />` |

```diff
- <Progress :width="120" :successPercent="30" />
+ <Progress :size="120" :success="{ percent: 30 }" />
```

---

## 8. Tooltip / Popover 变更

### `arrowPointAtCenter` → `arrow`

```diff
- <Tooltip arrowPointAtCenter />
+ <Tooltip :arrow="{ pointAtCenter: true }" />
```

---

## 9. Card 变更

### tabList slot 变更

```diff
- <Card :tabList="tabs">
-   <template #tab="item">{{ item.tab }}</template>
- </Card>
+ <Card :tabList="tabs">
+   <template #customTab="item">{{ item.tab }}</template>
+ </Card>
```

---

## 10. Slider 变更

### `tooltipVisible` → `tooltipOpen`

```diff
- <Slider :tooltipVisible="true" />
+ <Slider :tooltipOpen="true" />
```

---

## 11. Table 变更

### 废弃的 API

| 旧 API | 新 API |
|--------|--------|
| `filterDropdownVisible` | `filterDropdownOpen` |
| `onFilterDropdownVisibleChange` | `onFilterDropdownOpenChange` |
| `column.sorter.compare` + `column.sorter.multiple` | `sorterColumns` |
| `expandedRowRender` prop | 使用 `columns` 中的 `EXPAND_COLUMN` |

---

## 12. DatePicker / TimePicker 变更

| 旧 API | 新 API |
|--------|--------|
| `disabledHours` / `disabledMinutes` / `disabledSeconds` | `disabledTime` |
| `ranges`（RangePicker） | `presets` |
| `defaultPickerValue` | `defaultValue` |

```diff
- <RangePicker :ranges="{ '今天': [dayjs(), dayjs()] }" />
+ <RangePicker :presets="[{ label: '今天', value: [dayjs(), dayjs()] }]" />
```

---

## 13. Select / TreeSelect 变更

| 旧 API | 新 API |
|--------|--------|
| `dropdownClassName` | `popupClassName` |
| `inputValue` | `searchValue` |

---

## 14. Upload 变更

| 旧 prop | 新 prop |
|---------|---------|
| `remove` | `onRemove` |
| `beforeUpload` slot | `beforeUpload` prop |

---

## 15. 导出方式变更

### message / notification

不再挂载到全局属性（`$message`、`$notification`），统一使用导入方式或 `useApp()`：

```diff
- // Options API
- this.$message.success('成功')
- this.$notification.open({ message: '提示' })

+ // Composition API
+ import { message, notification } from '@ant-design-vue/ui'
+ message.success('成功')
+ notification.open({ message: '提示' })

+ // 或使用 App 组件 + useApp
+ import { useApp } from '@ant-design-vue/ui'
+ const { message, notification } = useApp()
```

### Modal 静态方法

```diff
- this.$confirm({ title: '确认' })
- this.$info({ title: '信息' })

+ import { Modal } from '@ant-design-vue/ui'
+ Modal.confirm({ title: '确认' })
+ Modal.info({ title: '信息' })
```

---

## 16. 依赖变更

### 新增依赖

| 包名 | 用途 |
|------|------|
| `@floating-ui/vue` | 弹出层定位（替代内部 vc-trigger） |
| `@vueuse/core` | Vue 3 组合式工具集 |

### 移除依赖

| 包名 | 说明 |
|------|------|
| `less` / `less-loader` | 样式不再使用 LESS |
| `ant-design-vue/es/style` | 按需加载样式已不需要 |
| `unplugin-vue-components` 的 antd resolver | 需要适配新包名 |

### Vue 版本要求

```
vue >= 3.2.34
```

---

## 17. TypeScript 变更

### 类型导入路径

```diff
- import type { ButtonProps } from 'ant-design-vue'
+ import type { ButtonProps } from '@ant-design-vue/ui'
```

### Slot 类型

组件 Slot 类型统一使用 `Slot`（无参数）和 `ScopedSlot<T>`（带参数，单一对象参数）：

```typescript
// 内部类型定义
interface TableSlots {
  default?: Slot
  bodyCell?: ScopedSlot<{ record: any; column: any; index: number }>
}
```

---

## 18. 内部架构变更（库开发者需关注）

| 变更项 | 旧版 | 新版 |
|--------|------|------|
| 组件格式 | JSX (`.tsx`) | SFC `<script setup>` (`.vue`) |
| 样式方案 | CSS-in-JS / LESS | CSS 文件 + CSS 变量 |
| 弹出定位 | `vc-trigger`（自研） | `@floating-ui/vue` |
| 传送门 | 自研 `PortalWrapper` | Vue 原生 `<Teleport>` |
| 测试框架 | Jest | Vitest |
| 构建工具 | Webpack + Babel | Vite |
| 包管理 | 单包 | Monorepo (Turbo) |

---

## 附录：Deprecated Props 完整清单

以下属性在当前版本**仍可使用**，但会在控制台输出 deprecation 警告，将在下一个大版本中移除。建议尽早迁移。

### 通用：`visible` → `open`

| 组件 | 废弃 prop | 替代 prop |
|------|-----------|-----------|
| Modal | `visible` | `open` |
| Modal | `v-model:visible` | `v-model:open` |
| Drawer | `visible` | `open` |
| Drawer | `v-model:visible` | `v-model:open` |
| Tooltip | `visible` | `open` |
| Tooltip | `v-model:visible` | `v-model:open` |
| Popover | `visible` | `open` |
| Popover | `v-model:visible` | `v-model:open` |
| Popconfirm | `visible` | `open` |
| Popconfirm | `v-model:visible` | `v-model:open` |
| Dropdown | `visible` | `open` |
| Dropdown | `v-model:visible` | `v-model:open` |
| Tag | `visible` | 移除，使用 `v-if` |

### 通用：`visibleChange` → `openChange`

| 组件 | 废弃事件 | 替代事件 |
|------|----------|----------|
| Tooltip | `@visibleChange` | `@openChange` |
| Popover | `@visibleChange` | `@openChange` |
| Popconfirm | `@visibleChange` | `@openChange` |
| Dropdown | `@visibleChange` | `@openChange` |
| Drawer | `@afterVisibleChange` | `@afterOpenChange` |

### 通用：`dropdownClassName` → `popupClassName`

| 组件 | 废弃 prop | 替代 prop |
|------|-----------|-----------|
| Select | `dropdownClassName` | `popupClassName` |
| TreeSelect | `dropdownClassName` | `popupClassName` |
| Cascader | `dropdownClassName` | `popupClassName` |
| AutoComplete | `dropdownClassName` | `popupClassName` |
| DatePicker | `dropdownClassName` | `popupClassName` |
| RangePicker | `dropdownClassName` | `popupClassName` |

### Button

| 废弃 prop | 替代 prop | 说明 |
|-----------|-----------|------|
| `type` | `variant` | `primary`→`solid`, `default`→`outlined`, `dashed`→`dashed`, `text`→`text`, `link`→`link` |
| `size="large"` | `size="lg"` | 旧值自动映射 |
| `size="middle"` | `size="md"` | 旧值自动映射 |
| `size="small"` | `size="sm"` | 旧值自动映射 |

### Form

| 废弃 prop | 替代 prop | 说明 |
|-----------|-----------|------|
| `hideRequiredMark` | `requiredMark` | `hideRequiredMark` 等同于 `:requiredMark="false"` |

### Progress

| 废弃 prop | 替代 prop | 说明 |
|-----------|-----------|------|
| `width` | `size` | 控制环形进度条尺寸 |
| `successPercent` | `success` | 改为 `:success="{ percent: 30 }"` 对象形式 |
| `success.progress` | `success.percent` | 对象内字段也重命名了 |

### Tooltip / Popover

| 废弃 prop | 替代 prop | 说明 |
|-----------|-----------|------|
| `arrowPointAtCenter` | `arrow` | 改为 `:arrow="{ pointAtCenter: true }"` |

### Slider

| 废弃 prop | 替代 prop | 说明 |
|-----------|-----------|------|
| `tooltipVisible` | `tooltipOpen` | 控制 tooltip 是否始终显示 |

### Card

| 废弃 prop | 替代 prop | 说明 |
|-----------|-----------|------|
| tabList 的 `slots.tab` | `customTab` slot | 自定义 tab 渲染改用新 slot 名 |

### Collapse

| 废弃 prop | 替代 prop | 说明 |
|-----------|-----------|------|
| `disabled`（Collapse / CollapsePanel） | `collapsible="disabled"` | 改为通过 `collapsible` 控制 |

### Table

| 废弃 prop | 替代 prop | 说明 |
|-----------|-----------|------|
| Column `filterDropdownVisible` | `filterDropdownOpen` | |
| Column `onFilterDropdownVisibleChange` | `onFilterDropdownOpenChange` | |
| `expandIconColumnIndex` | `EXPAND_COLUMN` | 在 `columns` 数组中直接使用 `Table.EXPAND_COLUMN` |
| `sortOrder` / `sortColumn`（FilterState） | `sorterColumns` | |
| `rowSelection.onSelectAll` | `rowSelection.onChange` | `onSelectAll` 语义重复 |
| `rowSelection.onSelectInvert` | `rowSelection.onChange` | `onSelectInvert` 语义重复 |
| Column `onCellClick` | `customCell` | 通过 `customCell` 返回 `onClick` |
| Column `slots` | `v-slot:bodyCell` / `v-slot:headerCell` / `v-slot:filterIcon` | 旧的 slots 对象写法废弃 |

### Select / TreeSelect

| 废弃 prop | 替代 prop | 说明 |
|-----------|-----------|------|
| `inputValue` | `searchValue` | 搜索值 prop 重命名 |
| Option `key` | Option `value` | `key` 始终应等于 `value`，无需单独设置 |

### TreeSelect（onChange 回调参数）

| 废弃字段 | 替代方案 | 说明 |
|----------|----------|------|
| `extra.preValue` | 自行保存前值 | 不再由组件维护 |
| `extra.selected` / `extra.checked` | `onSelect` / `onDeselect` 事件 | |
| `extra.triggerNode` / `extra.allCheckedNodes` | — | 不再传递 React node 风格参数 |

### Cascader

| 废弃 prop | 替代 prop | 说明 |
|-----------|-----------|------|
| `popupVisible` | `open` | |
| `popupStyle` | `dropdownStyle` | |
| `popupPlacement` | `placement` | |
| `onPopupVisibleChange` | `onDropdownVisibleChange` | |

### DatePicker / TimePicker

| 废弃 prop | 替代 prop | 说明 |
|-----------|-----------|------|
| `dropdownClassName` | `popupClassName` | |
| `disabledHours` | `disabledTime` | 合并为单一函数 |
| `disabledMinutes` | `disabledTime` | 合并为单一函数 |
| `disabledSeconds` | `disabledTime` | 合并为单一函数 |
| `defaultOpenValue` | `defaultValue` | 命名简化 |
| RangePicker `ranges` | `presets` | 改为数组 `[{ label, value }]` 形式 |

### Upload

| 废弃 prop | 替代 prop | 说明 |
|-----------|-----------|------|
| `remove` | `onRemove` | 事件命名规范化 |
| `transformFile` | `beforeUpload` | 合并到 `beforeUpload` 中处理 |

---

## 迁移步骤建议

1. **更新依赖**：安装 `@ant-design-vue/ui`，移除 `ant-design-vue`
2. **替换样式引入**：移除所有 LESS/CSS-in-JS 引用，引入 `@ant-design-vue/ui/style.css`
3. **全局搜索替换**：
   - `visible` → `open`（Modal、Drawer、Tooltip 等）
   - `dropdownClassName` → `popupClassName`
   - `@visibleChange` → `@openChange`
4. **移除已删除的组件**：`Comment`、`PageHeader`、`LocaleProvider`
5. **更新主题定制**：从 JS token 迁移到 CSS 变量
6. **更新 Button type**：`type="primary"` → `variant="solid"`（可选，旧值暂时兼容）
7. **运行项目检查控制台 deprecation 警告**，逐一修复
