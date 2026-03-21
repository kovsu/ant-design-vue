import type { Slot } from '@/utils/types'
import type { MessageInstance } from '../message/types'
import type { NotificationInstance } from '../notification/types'
import type { ModalFuncProps, ModalFuncReturn } from '../modal/types'

export interface AppProps {
  /** Custom root CSS class name */
  rootClassName?: string
}

export interface AppSlots {
  default?: Slot
}

/** The imperative API context exposed by useApp() */
export interface AppConfig {
  message: MessageInstance
  notification: NotificationInstance
  modal: AppModalInstance
}

/** Modal imperative methods available via useApp().modal */
export interface AppModalInstance {
  confirm: (config: ModalFuncProps) => ModalFuncReturn
  info: (config: ModalFuncProps) => ModalFuncReturn
  success: (config: ModalFuncProps) => ModalFuncReturn
  error: (config: ModalFuncProps) => ModalFuncReturn
  warning: (config: ModalFuncProps) => ModalFuncReturn
}
