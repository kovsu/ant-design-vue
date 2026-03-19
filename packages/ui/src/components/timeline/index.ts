import { App, Plugin } from 'vue'
import Timeline from './Timeline.vue'
import TimelineItem from './TimelineItem.vue'
import './style/index.css'

export { default as Timeline } from './Timeline.vue'
export { default as TimelineItem } from './TimelineItem.vue'
export * from './types'

Timeline.install = function (app: App) {
  app.component('ATimeline', Timeline)
  app.component('ATimelineItem', TimelineItem)
  return app
}

TimelineItem.install = function (app: App) {
  app.component('ATimelineItem', TimelineItem)
  return app
}

export default Timeline as typeof Timeline & Plugin
