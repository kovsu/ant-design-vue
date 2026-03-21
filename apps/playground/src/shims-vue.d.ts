declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, never>, Record<string, never>, any>
  export default component
}

declare module 'virtual:demo-glob' {
  const entries: Array<{
    component: string
    name: string
    mod: any
    raw: string
  }>
  export default entries
}
