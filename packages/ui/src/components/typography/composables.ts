import { computed, ref, type Ref } from 'vue'
import type { TypographyBaseProps, EllipsisConfig, CopyConfig } from './types'

export function useTypographyClasses(props: TypographyBaseProps, extraClasses?: Record<string, boolean>) {
  return computed(() => ({
    'ant-typography': true,
    [`ant-typography-${props.type}`]: !!props.type,
    'ant-typography-disabled': !!props.disabled,
    ...extraClasses,
  }))
}

export function useEllipsis(props: TypographyBaseProps) {
  const expanded = ref(false)

  const config = computed<EllipsisConfig | null>(() => {
    if (!props.ellipsis) return null
    if (props.ellipsis === true) return { rows: 1 }
    return props.ellipsis
  })

  const ellipsisStyle = computed(() => {
    if (!config.value || expanded.value) return {}
    const rows = config.value.rows ?? 1
    if (rows === 1) {
      return {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap' as const,
      }
    }
    return {
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical' as const,
      WebkitLineClamp: rows,
    }
  })

  function toggleExpand() {
    expanded.value = !expanded.value
  }

  return { config, expanded, ellipsisStyle, toggleExpand }
}

export function useCopyable(props: TypographyBaseProps, textRef: Ref<string>) {
  const copied = ref(false)
  let timer: ReturnType<typeof setTimeout> | undefined

  const config = computed<CopyConfig | null>(() => {
    if (!props.copyable) return null
    if (props.copyable === true) return {}
    return props.copyable
  })

  async function handleCopy(event?: MouseEvent) {
    const text = config.value?.text ?? textRef.value
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // Fallback for non-secure contexts
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
    copied.value = true
    config.value?.onCopy?.(event)
    clearTimeout(timer)
    timer = setTimeout(() => {
      copied.value = false
    }, 3000)
  }

  return { config, copied, handleCopy }
}
