import { App, Plugin } from 'vue'
import Modal from './Modal.vue'
import { confirm, modalConfirm, modalInfo, modalSuccess, modalError, modalWarning, destroyAll } from './confirm'
import './style/index.css'

export { default as Modal } from './Modal.vue'
export * from './types'

type ModalWithStaticMethods = typeof Modal &
  Plugin & {
    confirm: typeof modalConfirm
    info: typeof modalInfo
    success: typeof modalSuccess
    error: typeof modalError
    warning: typeof modalWarning
    warn: typeof modalWarning
    destroyAll: typeof destroyAll
  }

Modal.install = function (app: App) {
  app.component('AModal', Modal)
  return app
}

const _Modal = Modal as ModalWithStaticMethods
_Modal.confirm = modalConfirm
_Modal.info = modalInfo
_Modal.success = modalSuccess
_Modal.error = modalError
_Modal.warning = modalWarning
_Modal.warn = modalWarning
_Modal.destroyAll = destroyAll

export default _Modal
