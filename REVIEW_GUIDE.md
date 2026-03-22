# ant-design-vue SFC 重写 — Review 指南

> [English version](./REVIEW_GUIDE.en.md)

> 本文档面向社区贡献者和 AI agents，包含 review 所需的全部上下文。
> 分支：`feat/vapor` | 新包名：`@ant-design-vue/ui` | 代码目录：`packages/ui/src/`

---

## 1. 项目背景

将 ant-design-vue 从 **JSX + CSS-in-JS（cssinjs）** 重构为 **SFC + CSS 文件**。

**为什么重写：**
- 旧版使用 CSS-in-JS（cssinjs），运行时生成样式，SSR 性能差
- 大量 `vc-*` 内部组件是从 React `rc-*` 机械移植的，不符合 Vue 最佳实践
- JSX 无法利用 Vue 模板编译器优化

**核心原则：全部从零重写，不是逐行翻译旧代码。** 参考旧代码只为理解行为规格，代码结构完全基于 Vue 3.5+ 最佳实践。

---

## 2. Review 检查清单

每个组件请按以下维度检查：

### 2.1 文件结构
```
components/[name]/
├── [Name].vue              # 主组件 SFC
├── [SubName].vue           # 子组件（如 ButtonGroup.vue）
├── types.ts                # 所有 TS 类型、Props 接口、Emits
├── style/
│   └── index.css           # 样式，使用 ant-* 类名 + @apply Tailwind
├── demo/
│   ├── basic.vue           # 基础用法
│   └── [feature].vue       # 每个特性一个 demo
├── __tests__/
│   ├── index.test.ts       # 单元测试
│   └── demo.test.ts        # Demo 快照测试
└── index.ts                # 导出 + app.component() 注册
```

### 2.2 types.ts 规范

```typescript
// ✅ Props — TypeScript interface（不是 Options API 对象）
export interface ButtonProps {
  variant?: 'solid' | 'outlined' | 'text' | 'link' | 'dashed' | 'filled'
  size?: ButtonSize | ButtonLegacySize  // 兼容新旧尺寸值
  disabled?: boolean
}

// ✅ 默认值 — 纯对象 + as const
export const buttonDefaultProps = {
  variant: 'solid',
  size: 'md',
} as const

// ✅ Events — TypeScript interface, 通过 defineEmits 使用
export interface ButtonEmits {
  (e: 'click', event: MouseEvent): void
}

// ✅ Slots — 使用 Slot（无参）或 ScopedSlot<T>（有参）
import type { Slot, ScopedSlot } from '@/utils/types'
export interface ButtonSlots {
  default?: Slot                             // 无参 slot
  format?: ScopedSlot<{ percent: number }>   // 有参 slot，单对象参数
}
```

**Review 要点：**
- [ ] Props 类型是否完整，覆盖组件所有功能
- [ ] 是否保留了高频旧 API 兼容（`type` → `variant`，旧 size 名称等）
- [ ] 是否正确移除了不需要兼容的旧 API（`prefixCls`、CSS-in-JS APIs）
- [ ] 事件是否用 interface 定义，而非 prop 回调
- [ ] Slot 是否使用 `Slot` / `ScopedSlot<T>`，scoped slot 是否为单对象参数
- [ ] 默认值对象是否用 `as const`

### 2.3 SFC 组件规范

```vue
<template>
  <!-- 只用 ant-* 语义类名，禁止在 template 中使用 Tailwind 工具类 -->
  <div :class="rootClass">
    <slot />
  </div>
</template>

<script setup lang="ts">
// 必须声明组件名
defineOptions({ name: 'AButton' })

// 使用 withDefaults + 类型化 defineProps
const props = withDefaults(defineProps<ButtonProps>(), buttonDefaultProps)
const emit = defineEmits<ButtonEmits>()
defineSlots<ButtonSlots>()
</script>
```

**Review 要点：**
- [ ] `defineOptions({ name: 'AXxx' })` — 名称以 `A` 开头
- [ ] 使用 `<script setup lang="ts">`，非 Options API
- [ ] `withDefaults(defineProps<Props>(), defaults)` 模式
- [ ] `defineEmits<Emits>()` 声明事件
- [ ] `defineSlots<Slots>()` 声明插槽
- [ ] template 中只使用 `ant-*` 类名
- [ ] 动态 class 使用 computed

### 2.4 Boolean Prop 陷阱

Vue boolean casting 会导致可选 boolean prop 默认为 `false` 而不是 `undefined`。

```typescript
// ❌ 错误：showArrow 会默认 false，无法区分"未传"和"传了 false"
interface Props { showArrow?: boolean }

// ✅ 正确：需要区分 undefined 时，显式设默认值
const props = withDefaults(defineProps<Props>(), {
  showArrow: undefined as unknown as boolean | undefined
})
```

**Review 要点：**
- [ ] 需要区分 "未传" 和 "false" 的 boolean prop 是否正确设置了 `undefined` 默认值
- [ ] computed 变量名是否避免和 prop 同名（用 `shouldShowArrow` 而非 `showArrow`）

### 2.5 样式规范

```css
/* style/index.css */
@reference '../../../../theme.css';   /* 引入 Tailwind 配置 */

:where(.ant-btn) {                    /* :where() 低优先级，易覆盖 */
  @apply inline-flex items-center;    /* 用 @apply 写 Tailwind */
  color: var(--color-accent);         /* 颜色必须用 CSS 变量 */
  border-radius: var(--ant-border-radius);
}
```

**Review 要点：**
- [ ] 是否使用 `:where()` 包裹选择器（低 specificity）
- [ ] 颜色是否全部使用 CSS 变量（`--color-accent-*`, `--color-neutral-*`, `--color-error` 等）
- [ ] 是否使用了 `@reference` 引入 Tailwind 配置
- [ ] template 中是否有遗漏的 Tailwind 工具类（应该在 CSS 文件中）
- [ ] 不使用 `<style scoped>`，样式全在 CSS 文件中

### 2.6 API 兼容性

| 策略 | 说明 |
|------|------|
| **保留** | 高频 props：`type`（映射到 `variant`）、`v-model:value`、旧 size 名 |
| **移除** | `prefixCls`、CSS-in-JS APIs（`useToken`, `StyleProvider`） |
| **废弃提示** | `console.warn('[antdv] ...')` 仅在 dev mode 输出 |

**Review 要点：**
- [ ] 高频旧 API 是否有兼容映射
- [ ] 是否有 `resolveVariant` / `resolveSize` 类似的映射辅助函数
- [ ] 已废弃 prop 是否有 `@deprecated` JSDoc 标注
- [ ] `prefixCls` 等已确认移除的 prop 不应出现

### 2.7 SSR 安全

- [ ] `<script setup>` 顶层没有 `document` / `window` 访问
- [ ] 浏览器 API 只在 `onMounted` / `onBeforeUnmount` 中使用
- [ ] 或用 `typeof window !== 'undefined'` 守卫

### 2.8 无障碍（A11y）

- [ ] 交互元素有 ARIA role / state（`aria-disabled`, `aria-busy`, `aria-expanded` 等）
- [ ] 可聚焦元素支持键盘操作
- [ ] 图标按钮有 `aria-label`

### 2.9 测试

**测试文件 `__tests__/index.test.ts` 应覆盖：**
- [ ] 渲染：默认渲染、条件渲染
- [ ] 所有 Props：包含边界值、undefined/null
- [ ] Events：触发和阻止
- [ ] Slots：默认 slot 和具名 slot
- [ ] Exposed methods（如 focus/blur）
- [ ] ConfigProvider 集成（size / disabled 继承）
- [ ] 组件 name 检查（`AXxx`）

**`__tests__/demo.test.ts` 快照测试：**
- [ ] 每个 demo 都有快照
- [ ] 使用全局 test setup 中注册的组件

### 2.10 index.ts 导出

```typescript
import { App, Plugin } from 'vue'
import Button from './Button.vue'
import './style/index.css'

export { default as Button } from './Button.vue'
export * from './types'

Button.install = function (app: App) {
  app.component('AButton', Button)
  return app
}

export default Button as typeof Button & Plugin
```

- [ ] 是否导入了 CSS
- [ ] `install` 方法注册 `A` 前缀的组件名
- [ ] 导出类型和组件

---

## 3. CSS 变量速查

```
--color-accent-[1-10]       主色色阶
--color-accent              主色 (= accent-6)
--color-accent-hover        悬浮 (= accent-5)
--color-accent-active       按下 (= accent-7)
--color-accent-content      主色上的文字
--color-neutral             文字色
--color-neutral-secondary   次要文字
--color-neutral-disabled    禁用文字
--color-neutral-border      边框
--color-neutral-bg          背景
--color-error               错误
--color-warning             警告
--color-success             成功
--color-info                信息
--ant-border-radius         圆角
--ant-font-size             字号
--ant-motion-duration       动画时长
```

---

## 4. 内部基础组件

位于 `packages/ui/src/_internal/`，不对用户导出：

| 组件 | 作用 | 被谁使用 |
|------|------|----------|
| `trigger/` | 浮层定位（基于 @floating-ui/vue） | tooltip, popover, popconfirm, dropdown, select, cascader, mentions, auto-complete, time-picker, tree-select |
| `portal/` | Teleport 封装 + getPopupContainer | drawer |
| `virtual-list/` | 虚拟滚动 | select, auto-complete |
| `date-panel/` | 日期/时间选择面板（9 个 .vue） | date-picker, time-picker, calendar |

---

## 5. 参考示例：Button

**Button 是标准参考实现。** Review 其他组件时可以对照 Button 的写法。

- 类型定义：`components/button/types.ts`
- 组件实现：`components/button/Button.vue`
- 单元测试：`components/button/__tests__/index.test.ts`
- 样式文件：`components/button/style/index.css`

关键模式：
- `resolveVariant()` / `resolveSize()` — 旧 API 映射
- `withDefaults(defineProps<ButtonProps>(), buttonDefaultProps)` — 类型化 props
- `useConfigInject()` — 全局 size/disabled 继承
- `defineExpose({ focus, blur })` — 暴露方法
- `:where(.ant-btn)` — 低 specificity 样式

---

## 6. Review 顺序（从简到繁）

完整的按复杂度排序的清单见 [REVIEW_CHECKLIST.md](./REVIEW_CHECKLIST.md)。

**建议分工策略：**
- Tier 0 + 0.5（基础设施）— 1-2 人集中 review，其他 Tier 依赖这里的约定
- Tier 1-2（原子组件）— 适合新参与者，互相独立，可并行 review
- Tier 3-4（中高复杂度）— 需要了解整体架构
- Tier 5（复合组件）— 需要先理解 _internal 和被依赖组件

---

## 7. 如何开始 Review

```bash
# 1. 切到 feat/vapor 分支
git checkout feat/vapor

# 2. 安装依赖（需要 pnpm 9+）
pnpm install

# 3. 启动 Playground 查看 demo
cd apps/playground && pnpm dev
# 访问 http://localhost:5173
# 左侧栏选组件，可浏览所有 demo，也可在线编辑代码

# 4. 运行测试（在 packages/ui 目录下）
cd packages/ui && pnpm test
# 或从根目录：pnpm test

# 5. 选一个组件开始 review
# 先读 types.ts → 再读 [Name].vue → 对照 style/index.css → 在 Playground 中验证
# 组件源码都在 packages/ui/src/components/[name]/ 下
```

---

## 8. 提交 Review 意见

Review 时请标注问题类别：

- **[MUST]** — 必须修复，阻断合并（bug、类型错误、SSR 不安全、a11y 缺失）
- **[SHOULD]** — 强烈建议修复（不符合规范、性能问题、缺少边界处理）
- **[NICE]** — 可以改进（代码风格、命名优化、额外测试用例）

---

## 9. 常见 Review 问题模板

### 缺少旧 API 兼容
```
[SHOULD] `type` prop 兼容缺失
组件缺少对旧版 `type` prop 的兼容映射。
参考 Button 的 `resolveVariant()` 模式。
```

### Boolean prop 默认值
```
[MUST] `showArrow` boolean prop 默认值问题
Vue boolean casting 会使可选 boolean 默认为 false。
如果需要区分 "未传" 和 "false"，需显式设 undefined 默认值。
```

### SSR 不安全
```
[MUST] SSR: 顶层访问 document
第 XX 行在 setup 顶层使用了 document.xxx，SSR 环境会报错。
应移入 onMounted 或加 typeof window !== 'undefined' 守卫。
```

### 样式未使用 CSS 变量
```
[SHOULD] 硬编码颜色值
style/index.css 第 XX 行使用了 #1677ff，应替换为 var(--color-accent)。
```
