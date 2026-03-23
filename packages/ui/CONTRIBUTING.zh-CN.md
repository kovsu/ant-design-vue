# 参与贡献 @ant-design-vue/ui

[English](./CONTRIBUTING.md)

感谢你对 ant-design-vue 重构项目的关注！

我们已经完成了 ant-design-vue 从 JSX + CSS-in-JS 到 SFC + CSS 的重构，新代码位于 `packages/ui`。现在需要社区的力量来 **review 每一个组件** —— 检查 bug、API 一致性、无障碍访问、边界情况和改进空间。

## AI-First 协作

**所有 PR 的每一个 commit 都必须使用 AI 编码工具完成。** CI 会自动检查，不符合要求的 PR 无法合并。

支持的工具：**Claude Code**、**GitHub Copilot**、**Cursor**、**Codex**。

### 为什么？

1. **质量** — AI 能在编码阶段发现人容易忽略的问题
2. **一致性** — AI 帮助不同贡献者保持统一的代码风格和架构
3. **实验** — 我们想探索 AI-First 开源协作的可能性

## 如何参与

### 1. 认领组件

前往仓库置顶的 **Component Review Tracker** issue，评论认领你想 review 的组件。每个组件同一时间只能被一个人认领。

### 2. Review 组件

使用 AI 编码工具 review 组件代码，重点关注：

- **正确性** — 组件行为是否符合预期？有没有边界情况？
- **API 兼容性** — API 是否符合 ant-design-vue 的惯例？
- **无障碍访问** — 键盘导航、ARIA 属性、屏幕阅读器支持
- **SSR 安全** — 没有顶层的 `document`/`window` 访问
- **类型安全** — TypeScript 类型是否正确且完整？
- **样式** — 样式是否遵循 CSS 变量主题系统？
- **测试** — 测试是否全面？有没有遗漏的场景？
- **性能** — 是否有不必要的重渲染或重计算？

### 3. 提交 PR

- 目标分支：**`feat/vapor`**
- 分支命名：`review/[component-name]`
- 每个 PR 只包含一个组件
- 包含 review 总结：检查了什么、改了什么

## 本地开发

```bash
# 安装依赖
pnpm install

# 启动 playground 预览组件
cd apps/playground && pnpm dev

# 运行测试
pnpm test

# 运行单个组件测试
pnpm test -- --filter button
```

## 架构参考

详细的代码规范和架构设计请阅读 [`packages/ui/CLAUDE.md`](./CLAUDE.md)：

- **SFC + CSS 文件** — `<script setup lang="ts">` + `<template>`，不使用 CSS-in-JS
- **API 兼容** — 保留高频 props，废弃的 API 用 `[antdv]` 前缀在 dev 模式下警告
- **CSS 变量主题** — 所有颜色引用 CSS 变量，通过 `<Theme>` 组件注入
- **SSR 安全** — `document`/`window` 仅在 `onMounted` 或 guard 中使用
