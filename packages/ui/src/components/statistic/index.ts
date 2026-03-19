import { App, Plugin } from 'vue'
import Statistic from './Statistic.vue'
import Countdown from './Countdown.vue'
import './style/index.css'

export { default as Statistic } from './Statistic.vue'
export { default as StatisticCountdown } from './Countdown.vue'
export * from './types'

Statistic.install = function (app: App) {
  app.component('AStatistic', Statistic)
  app.component('AStatisticCountdown', Countdown)
  return app
}

export default Statistic as typeof Statistic & Plugin
