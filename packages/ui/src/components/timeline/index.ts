import type { App, Plugin } from 'vue'
import Timeline from './Timeline.vue'
import TimelineItem from './TimelineItem.vue'
import './style/index.css'

export { default as Timeline } from './Timeline.vue'
export { default as TimelineItem } from './TimelineItem.vue'
export * from './types'

const install = (app: App) => {
  app.component('ATimeline', Timeline)
  app.component('ATimelineItem', TimelineItem)
  return app
}

Timeline.install = install

export default Timeline as typeof Timeline & Plugin
