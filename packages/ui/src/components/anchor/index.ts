import { App, Plugin } from 'vue'
import Anchor from './Anchor.vue'
import AnchorLink from './AnchorLink.vue'
import './style/index.css'

export { default as Anchor } from './Anchor.vue'
export { default as AnchorLink } from './AnchorLink.vue'
export * from './types'

type AnchorWithSub = typeof Anchor &
  Plugin & {
    Link: typeof AnchorLink
  }

Anchor.install = function (app: App) {
  app.component('AAnchor', Anchor)
  app.component('AAnchorLink', AnchorLink)
  return app
}

const _Anchor = Anchor as AnchorWithSub
_Anchor.Link = AnchorLink

export default _Anchor
