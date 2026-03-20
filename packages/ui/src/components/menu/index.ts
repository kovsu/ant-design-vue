import { App, Plugin } from 'vue'
import Menu from './Menu.vue'
import MenuItem from './MenuItem.vue'
import SubMenu from './SubMenu.vue'
import ItemGroup from './ItemGroup.vue'
import MenuDivider from './Divider.vue'
import './style/index.css'

export { default as Menu } from './Menu.vue'
export { default as MenuItem } from './MenuItem.vue'
export { default as SubMenu } from './SubMenu.vue'
export { default as MenuItemGroup } from './ItemGroup.vue'
export { default as MenuDivider } from './Divider.vue'
export * from './types'

const install = (app: App) => {
  app.component('AMenu', Menu)
  app.component('AMenuItem', MenuItem)
  app.component('ASubMenu', SubMenu)
  app.component('AMenuItemGroup', ItemGroup)
  app.component('AMenuDivider', MenuDivider)
  return app
}

Menu.install = install

export default Menu as typeof Menu & Plugin
