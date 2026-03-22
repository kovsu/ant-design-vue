import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import App from './App.vue'
import { componentGroups } from './data/demos'

const firstComponent = componentGroups[0]?.name ?? 'button'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: `/${firstComponent}` },
    {
      path: '/:component',
      component: () => import('./views/BrowseView.vue'),
    },
  ],
})

const app = createApp(App)
app.use(router)
app.use(Antd)
app.mount('#app')
