import { RouteRecordRaw } from 'vue-router'
import { componentGroups } from '#/data/demos'
import BrowseView from '#/views/BrowseView.vue'
import EditorView from '#/views/EditorView.vue'

const firstComponent = componentGroups[0]?.name ?? 'button'

export default [
  { path: '/', redirect: `/${firstComponent}` },
  { path: '/playground', component: EditorView },
  { path: '/:component', component: BrowseView },
  { path: '/:component/:demo', component: EditorView },
] as RouteRecordRaw[]
