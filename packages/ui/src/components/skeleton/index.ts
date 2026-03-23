import type { App, Plugin } from 'vue'
import Skeleton from './Skeleton.vue'
import SkeletonButton from './SkeletonButton.vue'
import SkeletonInput from './SkeletonInput.vue'
import SkeletonImage from './SkeletonImage.vue'
import SkeletonAvatar from './SkeletonAvatar.vue'
import './style/index.css'

export { default as Skeleton } from './Skeleton.vue'
export { default as SkeletonButton } from './SkeletonButton.vue'
export { default as SkeletonInput } from './SkeletonInput.vue'
export { default as SkeletonImage } from './SkeletonImage.vue'
export { default as SkeletonAvatar } from './SkeletonAvatar.vue'
export * from './types'

Skeleton.install = function (app: App) {
  app.component('ASkeleton', Skeleton)
  app.component('ASkeletonButton', SkeletonButton)
  app.component('ASkeletonInput', SkeletonInput)
  app.component('ASkeletonImage', SkeletonImage)
  app.component('ASkeletonAvatar', SkeletonAvatar)
  return app
}

export default Skeleton as typeof Skeleton & Plugin
