# Contributing to @ant-design-vue/ui

[中文版](./CONTRIBUTING.zh-CN.md)

Thank you for your interest in the ant-design-vue refactoring project!

We have refactored ant-design-vue from JSX + CSS-in-JS to SFC + CSS. The new code lives in `packages/ui`. Now we need the community's help to **review every component** — check for bugs, API inconsistencies, accessibility issues, edge cases, and improvement opportunities.

## AI-First Collaboration

**Every commit in every PR must be produced with an AI coding tool.** CI enforces this automatically — PRs that don't meet this requirement cannot be merged.

Supported tools: **Claude Code**, **GitHub Copilot**, **Cursor**, **Codex**.

### Why?

1. **Quality** — AI catches issues during coding that humans might miss
2. **Consistency** — AI helps maintain code style and architecture across contributors
3. **Experiment** — We're exploring what AI-First open source collaboration looks like

## How to Participate

### 1. Claim a Component

Go to the **Component Review Tracker** issue (pinned in the repo) and comment to claim a component. Each component can be claimed by one person at a time.

### 2. Review the Component

Use an AI coding tool to review the component code. Focus on:

- **Correctness** — Does the component behave as expected? Any edge cases?
- **API compatibility** — Does the API match ant-design-vue conventions?
- **Accessibility** — Keyboard navigation, ARIA attributes, screen reader support
- **SSR safety** — No top-level `document`/`window` access
- **Type safety** — Are TypeScript types correct and complete?
- **Style** — Do styles follow the CSS variable theming system?
- **Tests** — Are tests comprehensive? Any missing scenarios?
- **Performance** — Any unnecessary re-renders or heavy computations?

### 3. Submit a PR

- Target branch: **`feat/vapor`**
- Branch naming: `review/[component-name]`
- One PR per component
- Include a summary of what was reviewed and what was changed

## Local Development

```bash
# Install dependencies
pnpm install

# Start playground to preview components
cd apps/playground && pnpm dev

# Run tests
pnpm test

# Run single component test
pnpm test -- --filter button
```

## Architecture Reference

Read [`packages/ui/CLAUDE.md`](./CLAUDE.md) for detailed code conventions and architecture:

- **SFC + CSS files** — `<script setup lang="ts">` + `<template>`, no CSS-in-JS
- **API compatible** — Keep high-frequency props, deprecated APIs warn with `[antdv]` prefix
- **CSS variable theming** — All colors via CSS variables, injected by `<Theme>` component
- **SSR-safe** — `document`/`window` only in `onMounted` or behind guards
