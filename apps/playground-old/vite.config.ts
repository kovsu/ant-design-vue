import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'node:path'
import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { defineConfig, Plugin } from 'vite'

const monorepoRoot = resolve(__dirname, '../..')
const oldCompsDir = resolve(monorepoRoot, 'components')
const newCompsDir = resolve(monorepoRoot, 'packages/ui/src/components')

/** Get the set of component names that exist in both old and new. */
function getComparableComponents(): Set<string> {
  const oldComps = new Set(
    readdirSync(oldCompsDir).filter(
      f => !f.startsWith('_') && !f.startsWith('.') && !f.endsWith('.ts'),
    ),
  )
  const newComps = new Set(
    readdirSync(newCompsDir).filter(
      f => !f.startsWith('_') && !f.startsWith('.') && !f.endsWith('.ts'),
    ),
  )
  return new Set([...oldComps].filter(c => newComps.has(c)))
}

/**
 * Strip <docs> blocks from old demo .vue files BEFORE the Vue plugin.
 */
function stripDocsPlugin(): Plugin {
  return {
    name: 'strip-docs-block',
    enforce: 'pre',
    load(id) {
      if (!id.endsWith('.vue')) return
      if (!id.includes('/components/') || !id.includes('/demo/')) return
      const code = readFileSync(id, 'utf-8')
      if (code.includes('<docs')) {
        return code.replace(/<docs[\s\S]*?<\/docs>\s*/gi, '')
      }
    },
  }
}

/**
 * Scan old demo .vue files, but ONLY for components that also exist in new packages.
 */
function oldDemoGlobPlugin(): Plugin {
  const VIRTUAL_ID = 'virtual:old-demo-glob'
  const RESOLVED_ID = '\0' + VIRTUAL_ID
  const comparable = getComparableComponents()

  function scanDemos() {
    const result: Record<string, string[]> = {}
    for (const comp of comparable) {
      const demoDir = resolve(oldCompsDir, comp, 'demo')
      try {
        const files = readdirSync(demoDir).filter(
          f => f.endsWith('.vue') && f !== 'index.vue',
        )
        if (files.length) result[comp] = files.map(f => f.replace('.vue', ''))
      } catch {}
    }
    return result
  }

  return {
    name: 'old-demo-glob',
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID
    },
    load(id) {
      if (id !== RESOLVED_ID) return
      const demos = scanDemos()
      const entries: string[] = []
      for (const [comp, names] of Object.entries(demos).sort(([a], [b]) => a.localeCompare(b))) {
        for (const name of names) {
          const path = `${oldCompsDir}/${comp}/demo/${name}.vue`
          entries.push(
            `  { component: ${JSON.stringify(comp)}, name: ${JSON.stringify(name)}, load: () => import(${JSON.stringify(path)}) }`,
          )
        }
      }
      return `export default [\n${entries.join(',\n')}\n]\n`
    },
  }
}

export default defineConfig({
  plugins: [stripDocsPlugin(), vue(), vueJsx(), oldDemoGlobPlugin()],
  server: {
    port: 5174,
    fs: { allow: [monorepoRoot] },
    cors: true,
  },
  resolve: {
    alias: {
      'ant-design-vue/es': resolve(oldCompsDir),
      'ant-design-vue/lib': resolve(oldCompsDir),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {},
      },
    },
  },
})
