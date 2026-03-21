import { inject, type InjectionKey } from 'vue'
import type { AppConfig, AppModalInstance } from './types'
import type { MessageInstance } from '../message/types'
import type { NotificationInstance } from '../notification/types'

export const appContextKey: InjectionKey<AppConfig> = Symbol('appContext')

const noopFn = () => {}
const noopReturn = () => ({ destroy: noopFn, update: noopFn })

const noopMessage: MessageInstance = {
  success: noopFn as any,
  error: noopFn as any,
  info: noopFn as any,
  warning: noopFn as any,
  loading: noopFn as any,
  open: noopFn as any,
  destroy: noopFn,
  config: noopFn,
}

const noopNotification: NotificationInstance = {
  success: noopFn,
  error: noopFn,
  info: noopFn,
  warning: noopFn,
  open: noopFn,
  close: noopFn,
  destroy: noopFn,
  config: noopFn,
}

const noopModal: AppModalInstance = {
  confirm: noopReturn,
  info: noopReturn,
  success: noopReturn,
  error: noopReturn,
  warning: noopReturn,
}

/**
 * Composable to access imperative message, notification, and modal APIs
 * provided by the `<a-app>` wrapper component.
 *
 * Returns no-op stubs when used outside of `<a-app>`.
 */
export function useApp(): AppConfig {
  const context = inject(appContextKey)
  if (!context) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        '[antdv] useApp() was called outside of <a-app>. ' +
          'Wrap your application with <a-app> to use imperative APIs.',
      )
    }
    return {
      message: noopMessage,
      notification: noopNotification,
      modal: noopModal,
    }
  }
  return context
}
