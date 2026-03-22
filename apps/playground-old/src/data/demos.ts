import rawDemos from 'virtual:old-demo-glob'
import { defineAsyncComponent, defineComponent, h, ref, onErrorCaptured } from 'vue'

export interface Demo {
  name: string
  component: any
}

export interface ComponentGroup {
  name: string
  demos: Demo[]
}

const grouped = new Map<string, Demo[]>()
for (const entry of rawDemos) {
  let list = grouped.get(entry.component)
  if (!list) {
    list = []
    grouped.set(entry.component, list)
  }
  list.push({
    name: entry.name,
    component: defineAsyncComponent({
      loader: () => entry.load().then((m: any) => m.default || m),
      errorComponent: defineComponent({
        setup() {
          return () => h('div', { style: 'color: #999; font-style: italic; font-size: 13px' }, 'Failed to load demo (missing dependency)')
        },
      }),
    }),
  })
}

export const componentGroups: ComponentGroup[] = Array.from(grouped.entries())
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([name, demos]) => ({ name, demos }))

export function findComponent(name: string): ComponentGroup | undefined {
  return componentGroups.find(g => g.name === name)
}
