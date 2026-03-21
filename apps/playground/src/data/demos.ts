import entries from 'virtual:demo-glob'

export interface DemoInfo {
  name: string
  component: any
  raw: string
}

export interface ComponentGroup {
  name: string
  demos: DemoInfo[]
}

const groupMap: Record<string, DemoInfo[]> = {}

for (const { component, name, mod, raw } of entries) {
  if (!groupMap[component]) groupMap[component] = []
  groupMap[component].push({ name, component: mod, raw })
}

export const componentGroups: ComponentGroup[] = Object.entries(groupMap)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([name, demos]) => ({ name, demos }))

export function findComponent(name: string): ComponentGroup | undefined {
  return componentGroups.find(c => c.name === name)
}

export function findDemo(componentName: string, demoName: string): DemoInfo | undefined {
  return groupMap[componentName]?.find(d => d.name === demoName)
}
