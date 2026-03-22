import entries from 'virtual:old-demo-glob'
import { defineAsyncComponent } from 'vue'

export interface OldDemoInfo {
  name: string
  component: any
}

export interface OldComponentGroup {
  name: string
  demos: OldDemoInfo[]
}

const groupMap: Record<string, OldDemoInfo[]> = {}

for (const { component, name, load } of entries) {
  if (!groupMap[component]) groupMap[component] = []
  groupMap[component].push({
    name,
    component: defineAsyncComponent({
      loader: () => load().then((m: any) => m.default || m),
      onError(err) {
        console.warn(`[old-demo] Failed to load ${component}/${name}:`, err)
      },
    }),
  })
}

export const oldComponentGroups: OldComponentGroup[] = Object.entries(groupMap)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([name, demos]) => ({ name, demos }))

export function findOldComponent(name: string): OldComponentGroup | undefined {
  return oldComponentGroups.find(c => c.name === name)
}
