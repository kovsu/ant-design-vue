import { createApp, reactive, type VNode } from 'vue'
import NotificationContainer from './NotificationContainer.vue'
import type {
  NotificationArgsProps,
  NotificationConfigProps,
  NotificationInstance,
  NotificationType,
  NotificationPlacement,
  InternalNotificationItem,
} from './types'

let seed = 0
function genId() {
  return `ant-notification-${++seed}`
}

// Group notifications by placement
const placementMap = reactive<Record<string, InternalNotificationItem[]>>({})
const mountedPlacements = new Set<string>()

const globalConfig: NotificationConfigProps = {
  top: 24,
  bottom: 24,
  duration: 4.5,
  placement: 'topRight',
}

function getPlacementItems(placement: NotificationPlacement): InternalNotificationItem[] {
  if (!placementMap[placement]) {
    placementMap[placement] = reactive<InternalNotificationItem[]>([])
  }
  return placementMap[placement]
}

function ensurePlacementMounted(placement: NotificationPlacement) {
  if (mountedPlacements.has(placement) || typeof document === 'undefined') return

  const items = getPlacementItems(placement)
  const container = document.createElement('div')
  document.body.appendChild(container)

  const app = createApp(NotificationContainer, {
    items,
    placement,
    top: globalConfig.top,
    bottom: globalConfig.bottom,
    onClose: (id: string) => {
      removeNotification(placement, id)
    },
  })

  app.mount(container)
  mountedPlacements.add(placement)
}

function removeNotification(placement: NotificationPlacement, id: string) {
  const items = getPlacementItems(placement)
  const idx = items.findIndex((n) => n.id === id)
  if (idx > -1) {
    const [item] = items.splice(idx, 1)
    item.args.onClose?.()
  }
}

function addNotification(args: NotificationArgsProps): void {
  const placement = args.placement || globalConfig.placement || 'topRight'
  ensurePlacementMounted(placement)

  const items = getPlacementItems(placement)

  // If key exists, update existing
  if (args.key) {
    const existing = items.find((n) => n.args.key === args.key)
    if (existing) {
      existing.args = { ...args }
      return
    }
  }

  // Enforce maxCount
  if (globalConfig.maxCount && items.length >= globalConfig.maxCount) {
    items.splice(0, items.length - globalConfig.maxCount + 1)
  }

  const id = genId()
  items.push({
    id,
    args: {
      ...args,
      duration: args.duration !== undefined ? args.duration : (globalConfig.duration ?? 4.5),
    },
  })
}

function createTypeFn(type: NotificationType) {
  return (args: NotificationArgsProps): void => {
    addNotification({ ...args, type })
  }
}

export const notification: NotificationInstance = {
  success: createTypeFn('success'),
  info: createTypeFn('info'),
  warning: createTypeFn('warning'),
  error: createTypeFn('error'),
  open: (args: NotificationArgsProps) => addNotification(args),
  close: (key: string) => {
    for (const placement of Object.keys(placementMap)) {
      const items = placementMap[placement]
      const item = items.find((n) => n.args.key === key)
      if (item) {
        removeNotification(placement as NotificationPlacement, item.id)
        return
      }
    }
  },
  destroy: () => {
    for (const placement of Object.keys(placementMap)) {
      placementMap[placement].splice(0, placementMap[placement].length)
    }
  },
  config: (options: NotificationConfigProps) => {
    Object.assign(globalConfig, options)
  },
}
