import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import { readdirSync, statSync, readFileSync } from 'node:fs'
import { defineConfig, Plugin } from 'vite'

const uiSrc = resolve(__dirname, '../../packages/ui/src')
const monorepoRoot = resolve(__dirname, '../..')

/** Scan demo .vue files from UI source at build/serve time */
function demoGlobPlugin(): Plugin {
  const VIRTUAL_ID = 'virtual:demo-glob'
  const RESOLVED_ID = '\0' + VIRTUAL_ID

  function scanDemos() {
    const compsDir = resolve(uiSrc, 'components')
    const result: Record<string, string[]> = {}
    for (const comp of readdirSync(compsDir)) {
      const demoDir = resolve(compsDir, comp, 'demo')
      try {
        const files = readdirSync(demoDir).filter(f => f.endsWith('.vue'))
        if (files.length) result[comp] = files.map(f => f.replace('.vue', ''))
      } catch {}
    }
    return result
  }

  return {
    name: 'demo-glob',
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID
    },
    load(id) {
      if (id !== RESOLVED_ID) return
      const demos = scanDemos()
      const imports: string[] = []
      const entries: string[] = []
      let i = 0
      for (const [comp, names] of Object.entries(demos).sort(([a], [b]) => a.localeCompare(b))) {
        for (const name of names) {
          const path = `${uiSrc}/components/${comp}/demo/${name}.vue`
          imports.push(`import _c${i} from ${JSON.stringify(path)}`)
          imports.push(`import _r${i} from ${JSON.stringify(path + '?raw')}`)
          entries.push(`  { component: ${JSON.stringify(comp)}, name: ${JSON.stringify(name)}, mod: _c${i}, raw: _r${i} }`)
          i++
        }
      }
      return `${imports.join('\n')}\nexport default [\n${entries.join(',\n')}\n]\n`
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss(), demoGlobPlugin()],
  server: {
    fs: { allow: [monorepoRoot] },
  },
  resolve: {
    alias: {
      // Point to UI source for HMR, no build needed
      '@ant-design-vue/ui/style.css': resolve(uiSrc, 'style/base.css'),
      '@ant-design-vue/ui/tailwind.css': resolve(uiSrc, 'style/tailwind.css'),
      '@ant-design-vue/ui': resolve(uiSrc, 'index.ts'),
      // @/ is used by UI source internally
      '@/': `${uiSrc}/`,
      // Playground own aliases
      '~/': resolve(__dirname, './assets') + '/',
      '#/': resolve(__dirname, './src') + '/',
      // Use full Vue build with runtime compiler for playground template compilation
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  },
})
