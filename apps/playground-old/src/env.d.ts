/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'virtual:old-demo-glob' {
  const demos: Array<{
    component: string
    name: string
    load: () => Promise<any>
  }>
  export default demos
}
