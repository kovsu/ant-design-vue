import { createApp, ref, h, type App } from 'vue'
import ConfirmDialog from './ConfirmDialog.vue'
import type { ModalFuncProps, ModalFuncReturn, ModalType } from './types'

const openDialogs: Array<{ app: App; destroy: () => void }> = []

export function confirm(config: ModalFuncProps): ModalFuncReturn {
  const container = document.createElement('div')
  document.body.appendChild(container)

  const configRef = ref({ ...config })

  let dialogInstance: any = null

  const app = createApp({
    setup() {
      return () =>
        h(ConfirmDialog, {
          config: configRef.value,
          onDestroy: () => {
            destroy()
          },
          ref: (el: any) => {
            dialogInstance = el
          },
        })
    },
  })

  app.mount(container)

  const entry = { app, destroy }

  openDialogs.push(entry)

  function destroy() {
    app.unmount()
    if (container.parentNode) {
      container.parentNode.removeChild(container)
    }
    const idx = openDialogs.indexOf(entry)
    if (idx > -1) openDialogs.splice(idx, 1)
  }

  function update(newConfig: Partial<ModalFuncProps>) {
    configRef.value = { ...configRef.value, ...newConfig }
  }

  return { destroy, update }
}

function withType(type: ModalType) {
  return (config: ModalFuncProps): ModalFuncReturn => {
    return confirm({
      ...config,
      type,
      okCancel: type === 'confirm',
    })
  }
}

export const modalConfirm = withType('confirm')
export const modalInfo = withType('info')
export const modalSuccess = withType('success')
export const modalError = withType('error')
export const modalWarning = withType('warning')

export function destroyAll() {
  while (openDialogs.length) {
    const dialog = openDialogs.pop()
    dialog?.destroy()
  }
}
