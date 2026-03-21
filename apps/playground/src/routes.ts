import { RouteRecordRaw, RouterView } from 'vue-router'
import BasicLayout from './components/BasicLayout.vue'
import DemoBlock from './components/DemoBlock.vue'
import PlaygroundPage from './views/PlaygroundPage.vue'
import { Fragment, h } from 'vue'

// /pages/button/basic.vue
const items = import.meta.glob('./pages/*/*.vue', { import: 'default', eager: true })
const rawItems = import.meta.glob('./pages/*/*.vue', {
  query: '?raw',
  import: 'default',
  eager: true,
})

interface DemoInfo {
  path: string
  component: any
  raw: string
}

const categoryDemos: Record<string, DemoInfo[]> = {}

Object.keys(items).forEach(filePath => {
  const route = filePath.replace('./pages/', '').replace('.vue', '')
  const [category, demo] = route.split('/')

  if (!categoryDemos[category]) {
    categoryDemos[category] = []
  }

  categoryDemos[category].push({
    path: demo,
    component: items[filePath],
    raw: rawItems[filePath] as string,
  })
})

const routes: RouteRecordRaw[] = Object.entries(categoryDemos).map(([category, demos]) => {
  const renderComponents = () =>
    h(
      'div',
      demos.map(demo =>
        h(DemoBlock, { title: demo.path, source: demo.raw }, () => h(demo.component)),
      ),
    )
  renderComponents.displayName = 'renderComponents'
  return {
    path: `/${category}`,
    component: RouterView,
    children: [
      ...demos.map(d => ({
        path: d.path,
        component: d.component,
      })),
      {
        path: ':demo*',
        component: renderComponents,
      },
    ],
  }
})

const navs = Object.keys(categoryDemos).map(category => ({
  name: category,
  path: `/${category}`,
  children: categoryDemos[category].map(d => ({
    name: d.path,
    path: `/${category}/${d.path}`,
  })),
}))
routes.push({
  path: '/:pathMatch(.*)*',
  component: h('div', 'demo not found'),
})
export default [
  {
    path: '/playground',
    component: PlaygroundPage,
  },
  {
    path: '/',
    component: BasicLayout,
    children: routes,
    props: {
      navs,
    },
  },
] as RouteRecordRaw[]
