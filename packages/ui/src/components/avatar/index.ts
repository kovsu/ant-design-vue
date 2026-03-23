import type { App, Plugin } from 'vue'
import Avatar from './Avatar.vue'
import AvatarGroup from './AvatarGroup.vue'
import './style/index.css'

export { default as Avatar } from './Avatar.vue'
export { default as AvatarGroup } from './AvatarGroup.vue'
export * from './types'

Avatar.install = function (app: App) {
  app.component('AAvatar', Avatar)
  app.component('AAvatarGroup', AvatarGroup)
  return app
}

export default Avatar as typeof Avatar & Plugin
