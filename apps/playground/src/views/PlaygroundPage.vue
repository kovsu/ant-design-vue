<template>
  <div class="playground">
    <!-- Header -->
    <header class="playground-header">
      <div class="playground-header-left">
        <RouterLink to="/" class="playground-back">&larr; Demos</RouterLink>
        <span class="playground-title">Playground</span>
      </div>
      <div class="playground-header-right">
        <button class="playground-btn" @click="formatCode" title="Format (Shift+Alt+F)">
          Format
        </button>
        <button class="playground-btn" @click="resetCode">Reset</button>
        <button class="playground-btn playground-btn-primary" @click="shareCode">
          {{ copied ? 'Copied!' : 'Share' }}
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <div class="playground-main">
      <!-- Editor -->
      <div class="playground-editor">
        <CodeEditor v-model="code" />
      </div>

      <!-- Divider -->
      <div class="playground-divider" @mousedown="startResize"></div>

      <!-- Preview -->
      <div class="playground-preview">
        <div v-if="error" class="playground-error">
          <strong>Error</strong>
          <pre>{{ error }}</pre>
        </div>
        <div v-else class="playground-preview-content">
          <component :is="compiledComponent" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  shallowRef,
  watch,
  defineComponent,
  markRaw,
  onErrorCaptured,
  onMounted,
  onBeforeUnmount,
} from 'vue'
import * as Vue from 'vue'
import CodeEditor from '@/components/CodeEditor.vue'
import DEFAULT_CODE from '@/assets/default-code.txt?raw'

// --- State ---
const code = ref(loadCodeFromHash() || DEFAULT_CODE.trim())
const error = ref('')
const compiledComponent = shallowRef<ReturnType<typeof defineComponent>>()
const copied = ref(false)

// --- Vue APIs available in script setup ---
const VUE_API_NAMES = [
  'ref',
  'reactive',
  'computed',
  'watch',
  'watchEffect',
  'onMounted',
  'onBeforeMount',
  'onUnmounted',
  'onBeforeUnmount',
  'nextTick',
  'h',
  'toRef',
  'toRefs',
  'shallowRef',
  'shallowReactive',
  'triggerRef',
  'provide',
  'inject',
  'readonly',
  'unref',
  'isRef',
  'isReactive',
  'isReadonly',
  'markRaw',
  'toRaw',
  'defineProps',
  'defineEmits',
] as const

const vueApiValues = VUE_API_NAMES.map(name => (Vue as any)[name])

// --- Compilation ---
function compileSFC(source: string) {
  // Extract template
  const templateMatch = source.match(/<template>([\s\S]*?)<\/template>\s*$/)
    || source.match(/<template>([\s\S]*)<\/template>/)
  if (!templateMatch) {
    throw new Error('Missing <template> block')
  }
  const template = templateMatch[1]

  // Extract script setup
  const scriptSetupMatch = source.match(
    /<script\s+setup(?:\s+lang="ts")?\s*>([\s\S]*?)<\/script>/,
  )

  if (!scriptSetupMatch) {
    // Template only
    return markRaw(defineComponent({ template }))
  }

  let scriptContent = scriptSetupMatch[1].trim()

  // Strip import statements (Vue APIs are provided automatically)
  scriptContent = scriptContent.replace(
    /^\s*import\s+.*?from\s+['"].*?['"]\s*;?\s*$/gm,
    '',
  )
  scriptContent = scriptContent.replace(
    /^\s*import\s+['"].*?['"]\s*;?\s*$/gm,
    '',
  )

  // Find all top-level bindings to return
  const bindings: string[] = []

  // const/let/var
  const varRegex =
    /(?:^|\n)\s*(?:const|let|var)\s+(?:\[([^\]]+)\]|\{([^}]+)\}|(\w+))/g
  let m
  while ((m = varRegex.exec(scriptContent)) !== null) {
    if (m[1]) {
      bindings.push(...m[1].split(',').map(v => v.trim()))
    } else if (m[2]) {
      bindings.push(
        ...m[2].split(',').map(v => {
          const parts = v.trim().split(':')
          return (parts.length > 1 ? parts[1] : parts[0])
            .trim()
            .split('=')[0]
            .trim()
        }),
      )
    } else if (m[3]) {
      bindings.push(m[3])
    }
  }

  // function declarations
  const funcRegex = /(?:^|\n)\s*function\s+(\w+)/g
  while ((m = funcRegex.exec(scriptContent)) !== null) {
    bindings.push(m[1])
  }

  // Create setup function with Vue APIs in scope
  const setupBody = `${scriptContent}\nreturn { ${[...new Set(bindings)].join(', ')} }`
  const setupFn = new Function(...VUE_API_NAMES, setupBody)

  return markRaw(
    defineComponent({
      template,
      setup() {
        return setupFn(...vueApiValues)
      },
    }),
  )
}

function compileCode(source: string) {
  try {
    compiledComponent.value = compileSFC(source)
    error.value = ''
  } catch (e: any) {
    error.value = e.message || String(e)
  }
}

// Catch rendering errors from dynamic component
onErrorCaptured((err: Error) => {
  error.value = err.message
  return false
})

// --- Debounced compilation ---
let timer: ReturnType<typeof setTimeout>
watch(
  code,
  newCode => {
    clearTimeout(timer)
    timer = setTimeout(() => compileCode(newCode), 300)
  },
)

// Initial compile
compileCode(code.value)

// --- URL hash sharing ---
function loadCodeFromHash(): string | null {
  const hash = location.hash.slice(1)
  if (!hash) return null
  try {
    return decodeURIComponent(atob(hash))
  } catch {
    return null
  }
}

function shareCode() {
  const encoded = btoa(encodeURIComponent(code.value))
  history.replaceState(null, '', `#${encoded}`)
  navigator.clipboard?.writeText(location.href).then(() => {
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  })
}

function resetCode() {
  code.value = DEFAULT_CODE.trim()
  history.replaceState(null, '', location.pathname)
}

function formatCode() {
  // Simple format: trim lines, normalize indentation
  code.value = code.value
    .split('\n')
    .map(line => line.trimEnd())
    .join('\n')
    .trim()
}

// --- Resizable divider ---
const startResize = (e: MouseEvent) => {
  const container = (e.target as HTMLElement).parentElement!
  const editor = container.querySelector('.playground-editor') as HTMLElement
  const preview = container.querySelector('.playground-preview') as HTMLElement
  const startX = e.clientX
  const startEditorWidth = editor.offsetWidth
  const totalWidth = container.offsetWidth

  const onMouseMove = (e: MouseEvent) => {
    const delta = e.clientX - startX
    const newEditorWidth = Math.max(200, Math.min(totalWidth - 200, startEditorWidth + delta))
    const percent = (newEditorWidth / totalWidth) * 100
    editor.style.width = `${percent}%`
    preview.style.width = `${100 - percent}%`
  }

  const onMouseUp = () => {
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
  }

  document.body.style.cursor = 'col-resize'
  document.body.style.userSelect = 'none'
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}

// Sync hash on popstate
const onPopState = () => {
  const hashCode = loadCodeFromHash()
  if (hashCode) code.value = hashCode
}
onMounted(() => window.addEventListener('popstate', onPopState))
onBeforeUnmount(() => window.removeEventListener('popstate', onPopState))
</script>

<style>
.playground {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: var(--color-neutral-bg, #fff);
  color: var(--color-neutral, #333);
}

.playground-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  height: 48px;
  border-bottom: 1px solid var(--color-neutral-border, #e5e5e5);
  flex-shrink: 0;
}

.playground-header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.playground-back {
  font-size: 14px;
  color: var(--color-accent, #1677ff);
  text-decoration: none;
}
.playground-back:hover {
  text-decoration: underline;
}

.playground-title {
  font-size: 16px;
  font-weight: 600;
}

.playground-header-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.playground-btn {
  padding: 4px 12px;
  font-size: 13px;
  border: 1px solid var(--color-neutral-border, #d9d9d9);
  border-radius: 6px;
  background: var(--color-neutral-bg, #fff);
  color: var(--color-neutral, #333);
  cursor: pointer;
  transition: all 0.2s;
}
.playground-btn:hover {
  border-color: var(--color-accent, #1677ff);
  color: var(--color-accent, #1677ff);
}

.playground-btn-primary {
  background: var(--color-accent, #1677ff);
  border-color: var(--color-accent, #1677ff);
  color: #fff;
}
.playground-btn-primary:hover {
  opacity: 0.85;
  color: #fff;
  border-color: var(--color-accent, #1677ff);
}

.playground-main {
  display: flex;
  flex: 1;
  min-height: 0;
}

.playground-editor {
  width: 50%;
  min-width: 200px;
  overflow: hidden;
}

.playground-divider {
  width: 4px;
  cursor: col-resize;
  background: var(--color-neutral-border, #e5e5e5);
  flex-shrink: 0;
  transition: background 0.2s;
}
.playground-divider:hover {
  background: var(--color-accent, #1677ff);
}

.playground-preview {
  width: 50%;
  min-width: 200px;
  overflow: auto;
}

.playground-preview-content {
  padding: 24px;
}

.playground-error {
  padding: 16px;
  margin: 16px;
  background: #fff2f0;
  border: 1px solid #ffccc7;
  border-radius: 8px;
  color: #ff4d4f;
  font-size: 13px;
}
.playground-error strong {
  display: block;
  margin-bottom: 8px;
}
.playground-error pre {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
  font-family: 'SF Mono', 'Fira Code', monospace;
}
</style>
