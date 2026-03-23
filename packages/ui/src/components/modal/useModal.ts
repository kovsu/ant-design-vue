import { defineComponent, ref, h, shallowReactive } from 'vue'
import ConfirmDialog from './ConfirmDialog.vue'
import type { ModalFuncProps, ModalFuncReturn, ModalType } from './types'

interface ModalEntry {
  key: number
  config: ModalFuncProps
  resolve: (() => void) | null
}

export function useModal(): [
  {
    confirm: (config: ModalFuncProps) => ModalFuncReturn
    info: (config: ModalFuncProps) => ModalFuncReturn
    success: (config: ModalFuncProps) => ModalFuncReturn
    error: (config: ModalFuncProps) => ModalFuncReturn
    warning: (config: ModalFuncProps) => ModalFuncReturn
  },
  ReturnType<typeof defineComponent>,
] {
  let nextKey = 0
  const entries = shallowReactive<ModalEntry[]>([])

  function open(config: ModalFuncProps): ModalFuncReturn {
    const key = nextKey++
    const configRef = ref({ ...config })
    const entry: ModalEntry = { key, config: configRef.value, resolve: null }
    entries.push(entry)

    function destroy() {
      const idx = entries.indexOf(entry)
      if (idx > -1) entries.splice(idx, 1)
    }

    function update(newConfig: Partial<ModalFuncProps>) {
      Object.assign(configRef.value, newConfig)
      entry.config = { ...configRef.value }
      // Trigger reactivity
      const idx = entries.indexOf(entry)
      if (idx > -1) {
        entries.splice(idx, 1, { ...entry })
      }
    }

    return { destroy, update }
  }

  function withType(type: ModalType) {
    return (config: ModalFuncProps): ModalFuncReturn => {
      return open({ ...config, type, okCancel: type === 'confirm' })
    }
  }

  const modal = {
    confirm: withType('confirm'),
    info: withType('info'),
    success: withType('success'),
    error: withType('error'),
    warning: withType('warning'),
  }

  const ContextHolder = defineComponent({
    name: 'ModalContextHolder',
    setup() {
      return () =>
        entries.map((entry) =>
          h(ConfirmDialog, {
            key: entry.key,
            config: entry.config,
            onDestroy: () => {
              const idx = entries.indexOf(entry)
              if (idx > -1) entries.splice(idx, 1)
            },
          }),
        )
    },
  })

  return [modal, ContextHolder]
}
