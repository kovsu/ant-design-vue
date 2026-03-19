export interface AlertProps {
  /** Alert type */
  type?: 'success' | 'info' | 'warning' | 'error'
  /** Whether alert can be closed */
  closable?: boolean
  /** Main message content */
  message?: string
  /** Additional description text */
  description?: string
  /** Whether to show type icon */
  showIcon?: boolean
  /** Display as banner (full-width, no border, no icon default) */
  banner?: boolean
  /** Callback after close animation finishes */
  afterClose?: () => void
}

export const alertDefaultProps = {
  type: 'info',
  closable: false,
  showIcon: false,
  banner: false,
} as const

export interface AlertEmits {
  (e: 'close', event: MouseEvent): void
}

export interface AlertSlots {
  default?: (props: Record<string, never>) => any
  message?: (props: Record<string, never>) => any
  description?: (props: Record<string, never>) => any
  icon?: (props: Record<string, never>) => any
  closeIcon?: (props: Record<string, never>) => any
  closeText?: (props: Record<string, never>) => any
  action?: (props: Record<string, never>) => any
}
