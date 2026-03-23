import type { App, Plugin } from 'vue'
import Layout from './Layout.vue'
import Header from './Header.vue'
import Footer from './Footer.vue'
import Content from './Content.vue'
import Sider from './Sider.vue'
import './style/index.css'

export { default as Layout } from './Layout.vue'
export { default as LayoutHeader } from './Header.vue'
export { default as LayoutFooter } from './Footer.vue'
export { default as LayoutContent } from './Content.vue'
export { default as LayoutSider } from './Sider.vue'
export * from './types'

Layout.install = function (app: App) {
  app.component('ALayout', Layout)
  app.component('ALayoutHeader', Header)
  app.component('ALayoutFooter', Footer)
  app.component('ALayoutContent', Content)
  app.component('ALayoutSider', Sider)
  return app
}

export default Layout as typeof Layout & Plugin
