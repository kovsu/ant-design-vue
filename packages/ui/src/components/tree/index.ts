import type { App, Plugin } from 'vue'
import Tree from './Tree.vue'
import DirectoryTree from './DirectoryTree.vue'
import './style/index.css'

export { default as Tree } from './Tree.vue'
export { default as DirectoryTree } from './DirectoryTree.vue'
export * from './types'

Tree.install = function (app: App) {
  app.component('ATree', Tree)
  app.component('ADirectoryTree', DirectoryTree)
  return app
}

export default Tree as typeof Tree & Plugin
