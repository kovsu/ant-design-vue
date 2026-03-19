export type ResultStatus = 'success' | 'error' | 'info' | 'warning' | 403 | 404 | 500

export interface ResultProps {
  /** Result status, decides icon and color */
  status?: ResultStatus
  /** Title text */
  title?: string
  /** Subtitle text */
  subTitle?: string
}

export const resultDefaultProps = {
  status: 'info',
} as const

export interface ResultSlots {
  default?: (props: Record<string, never>) => any
  title?: (props: Record<string, never>) => any
  subTitle?: (props: Record<string, never>) => any
  icon?: (props: Record<string, never>) => any
  extra?: (props: Record<string, never>) => any
}
