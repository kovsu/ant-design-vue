# ant-design-vue SFC Rewrite — Review Guide

> [中文版](./REVIEW_GUIDE.md)

> This document is for community contributors and AI agents. It contains all the context needed for review.
> Branch: `feat/vapor` | New package: `@ant-design-vue/ui` | Source: `packages/ui/src/`

---

## 1. Background

Rewriting ant-design-vue from **JSX + CSS-in-JS (cssinjs)** to **SFC + CSS files**.

**Why rewrite:**
- Old version uses CSS-in-JS (cssinjs) with runtime style generation, poor SSR performance
- Many `vc-*` internal components were mechanically ported from React `rc-*` libs, not following Vue best practices
- JSX cannot leverage Vue's template compiler optimizations

**Core principle: rewrite from scratch, not line-by-line translation of old code.** Reference old code only for behavior specs; code structure is entirely based on Vue 3.5+ best practices.

---

## 2. Review Checklist

Check each component against these dimensions:

### 2.1 File Structure
```
components/[name]/
├── [Name].vue              # Main SFC component
├── [SubName].vue           # Sub-components (e.g. ButtonGroup.vue)
├── types.ts                # All TS types, Props interfaces, Emits
├── style/
│   └── index.css           # Styles using ant-* class names + @apply Tailwind
├── demo/
│   ├── basic.vue           # Basic usage
│   └── [feature].vue       # One demo per feature
├── __tests__/
│   ├── index.test.ts       # Unit tests
│   └── demo.test.ts        # Demo snapshot tests
└── index.ts                # Exports + app.component() registration
```

### 2.2 types.ts Conventions

```typescript
// ✅ Props — TypeScript interface (NOT Options API object)
export interface ButtonProps {
  variant?: 'solid' | 'outlined' | 'text' | 'link' | 'dashed' | 'filled'
  size?: ButtonSize | ButtonLegacySize  // support both old and new size values
  disabled?: boolean
}

// ✅ Defaults — plain object with `as const`
export const buttonDefaultProps = {
  variant: 'solid',
  size: 'md',
} as const

// ✅ Events — TypeScript interface, used via defineEmits
export interface ButtonEmits {
  (e: 'click', event: MouseEvent): void
}

// ✅ Slots — use Slot (no params) or ScopedSlot<T> (with params)
import type { Slot, ScopedSlot } from '@/utils/types'
export interface ButtonSlots {
  default?: Slot                             // no-param slot
  format?: ScopedSlot<{ percent: number }>   // scoped slot, single object param
}
```

**Review points:**
- [ ] Are prop types complete, covering all component features?
- [ ] Are high-frequency legacy API compat mappings present (`type` → `variant`, old size names, etc.)?
- [ ] Are dropped APIs correctly removed (`prefixCls`, CSS-in-JS APIs)?
- [ ] Are events defined via interface, not as prop callbacks?
- [ ] Do slots use `Slot` / `ScopedSlot<T>`? Are scoped slots single-object params?
- [ ] Does the defaults object use `as const`?

### 2.3 SFC Component Conventions

```vue
<template>
  <!-- Only ant-* semantic class names, NO Tailwind utilities in templates -->
  <div :class="rootClass">
    <slot />
  </div>
</template>

<script setup lang="ts">
// Component name is required
defineOptions({ name: 'AButton' })

// withDefaults + typed defineProps
const props = withDefaults(defineProps<ButtonProps>(), buttonDefaultProps)
const emit = defineEmits<ButtonEmits>()
defineSlots<ButtonSlots>()
</script>
```

**Review points:**
- [ ] `defineOptions({ name: 'AXxx' })` — name prefixed with `A`
- [ ] Uses `<script setup lang="ts">`, not Options API
- [ ] `withDefaults(defineProps<Props>(), defaults)` pattern
- [ ] `defineEmits<Emits>()` for event declarations
- [ ] `defineSlots<Slots>()` for slot declarations
- [ ] Template uses only `ant-*` class names
- [ ] Dynamic classes use computed

### 2.4 Boolean Prop Pitfall

Vue boolean casting causes optional boolean props to default to `false` instead of `undefined`.

```typescript
// ❌ Wrong: showArrow defaults to false, can't distinguish "not passed" from "passed false"
interface Props { showArrow?: boolean }

// ✅ Correct: explicitly set undefined default when distinction is needed
const props = withDefaults(defineProps<Props>(), {
  showArrow: undefined as unknown as boolean | undefined
})
```

**Review points:**
- [ ] Boolean props that need to distinguish "not passed" vs "false" — do they have explicit `undefined` defaults?
- [ ] Are computed ref names different from prop names? (use `shouldShowArrow` not `showArrow`)

### 2.5 Style Conventions

```css
/* style/index.css */
@reference '../../../../theme.css';   /* Import Tailwind config */

:where(.ant-btn) {                    /* :where() for low specificity, easy to override */
  @apply inline-flex items-center;    /* Use @apply for Tailwind utilities */
  color: var(--color-accent);         /* Colors MUST use CSS variables */
  border-radius: var(--ant-border-radius);
}
```

**Review points:**
- [ ] Are selectors wrapped in `:where()` (low specificity)?
- [ ] Do all colors use CSS variables (`--color-accent-*`, `--color-neutral-*`, `--color-error`, etc.)?
- [ ] Is `@reference` used to import Tailwind config?
- [ ] Any leaked Tailwind utility classes in templates (should be in CSS files)?
- [ ] No `<style scoped>` — all styles in CSS files

### 2.6 API Compatibility

| Strategy | Details |
|----------|---------|
| **Keep** | High-frequency props: `type` (maps to `variant`), `v-model:value`, legacy size names |
| **Drop** | `prefixCls`, CSS-in-JS APIs (`useToken`, `StyleProvider`) |
| **Deprecation warning** | `console.warn('[antdv] ...')` in dev mode only |

**Review points:**
- [ ] Are high-frequency legacy APIs mapped?
- [ ] Are there `resolveVariant` / `resolveSize` style mapping helpers?
- [ ] Do deprecated props have `@deprecated` JSDoc annotations?
- [ ] Confirmed-dropped props like `prefixCls` should not appear

### 2.7 SSR Safety

- [ ] No `document` / `window` access at `<script setup>` top level
- [ ] Browser APIs only in `onMounted` / `onBeforeUnmount`
- [ ] Or guarded with `typeof window !== 'undefined'`

### 2.8 Accessibility (A11y)

- [ ] Interactive elements have ARIA roles / states (`aria-disabled`, `aria-busy`, `aria-expanded`, etc.)
- [ ] Focusable elements support keyboard interaction
- [ ] Icon-only buttons have `aria-label`

### 2.9 Testing

**`__tests__/index.test.ts` should cover:**
- [ ] Rendering: default render, conditional render
- [ ] All props: including edge values, undefined/null
- [ ] Events: emitting and prevention
- [ ] Slots: default and named slots
- [ ] Exposed methods (e.g. focus/blur)
- [ ] ConfigProvider integration (size / disabled inheritance)
- [ ] Component name check (`AXxx`)

**`__tests__/demo.test.ts` snapshot tests:**
- [ ] Every demo has a snapshot
- [ ] Uses components registered in global test setup

### 2.10 index.ts Exports

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

- [ ] CSS is imported
- [ ] `install` registers component with `A` prefix
- [ ] Types and component are exported

---

## 3. CSS Variable Reference

```
--color-accent-[1-10]       Primary color palette
--color-accent              Primary color (= accent-6)
--color-accent-hover        Hover state (= accent-5)
--color-accent-active       Active state (= accent-7)
--color-accent-content      Text on primary background
--color-neutral             Text color
--color-neutral-secondary   Secondary text
--color-neutral-disabled    Disabled text
--color-neutral-border      Border color
--color-neutral-bg          Background
--color-error               Error
--color-warning             Warning
--color-success             Success
--color-info                Info
--ant-border-radius         Border radius
--ant-font-size             Base font size
--ant-motion-duration       Animation duration
```

---

## 4. Internal Components

Located in `packages/ui/src/_internal/`, NOT exported to users:

| Component | Purpose | Used by |
|-----------|---------|---------|
| `trigger/` | Floating positioning (based on @floating-ui/vue) | tooltip, popover, popconfirm, dropdown, select, cascader, mentions, auto-complete, time-picker, tree-select |
| `portal/` | Teleport wrapper + getPopupContainer | drawer |
| `virtual-list/` | Virtual scrolling | select, auto-complete |
| `date-panel/` | Date/time picker panels (9 .vue files) | date-picker, time-picker, calendar |

---

## 5. Reference Implementation: Button

**Button is the standard reference implementation.** Compare other components against Button's patterns.

- Type definitions: `components/button/types.ts`
- Component: `components/button/Button.vue`
- Unit tests: `components/button/__tests__/index.test.ts`
- Styles: `components/button/style/index.css`

Key patterns:
- `resolveVariant()` / `resolveSize()` — legacy API mapping
- `withDefaults(defineProps<ButtonProps>(), buttonDefaultProps)` — typed props
- `useConfigInject()` — global size/disabled inheritance
- `defineExpose({ focus, blur })` — exposed methods
- `:where(.ant-btn)` — low specificity styles

---

## 6. Review Order (Simple to Complex)

See [REVIEW_CHECKLIST.en.md](./REVIEW_CHECKLIST.en.md) for the full complexity-sorted list.

**Suggested division of work:**
- Tier 0 + 0.5 (infrastructure) — 1-2 people focused review; other tiers depend on these conventions
- Tier 1-2 (atomic components) — great for newcomers, independent, can review in parallel
- Tier 3-4 (medium-high complexity) — requires understanding of overall architecture
- Tier 5 (composite components) — review _internal and dependency components first

---

## 7. Getting Started

```bash
# 1. Switch to feat/vapor branch
git checkout feat/vapor

# 2. Install dependencies (requires pnpm 9+)
pnpm install

# 3. Start the Playground to view demos
cd apps/playground && pnpm dev
# Visit http://localhost:5173
# Use the sidebar to browse components, view demos, and edit code live

# 4. Run tests (from packages/ui directory)
cd packages/ui && pnpm test
# Or from root: pnpm test

# 5. Pick a component to review
# Read types.ts → then [Name].vue → compare with style/index.css → verify in Playground
# All component source is under packages/ui/src/components/[name]/
```

---

## 8. Submitting Review Feedback

Tag each issue with a severity level:

- **[MUST]** — Must fix, blocks merge (bugs, type errors, SSR-unsafe, missing a11y)
- **[SHOULD]** — Strongly recommended (convention violations, performance issues, missing edge cases)
- **[NICE]** — Nice to have (code style, naming improvements, extra test cases)

---

## 9. Common Review Issue Templates

### Missing legacy API compat
```
[SHOULD] Missing `type` prop compat
Component lacks legacy `type` prop mapping.
See Button's `resolveVariant()` pattern for reference.
```

### Boolean prop default
```
[MUST] `showArrow` boolean prop default issue
Vue boolean casting makes optional booleans default to false.
If distinguishing "not passed" from "false" is needed, set explicit undefined default.
```

### SSR unsafe
```
[MUST] SSR: top-level document access
Line XX accesses document.xxx at setup top level, will error in SSR.
Move into onMounted or guard with typeof window !== 'undefined'.
```

### Hardcoded color values
```
[SHOULD] Hardcoded color value
style/index.css line XX uses #1677ff, should be var(--color-accent).
```
