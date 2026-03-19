export type ProgressType = 'line' | 'circle' | 'dashboard'
export type ProgressStatus = 'normal' | 'exception' | 'active' | 'success'
export type StrokeLinecap = 'butt' | 'square' | 'round'

export interface ProgressGradient {
  direction?: string
  from?: string
  to?: string
  [percentage: string]: string | undefined
}

export interface SuccessProps {
  percent?: number
  strokeColor?: string
}

export interface ProgressProps {
  /** Progress type */
  type?: ProgressType
  /** Percentage (0-100) */
  percent?: number
  /** Show info text (percentage or status icon) */
  showInfo?: boolean
  /** Status */
  status?: ProgressStatus
  /** Stroke line cap */
  strokeLinecap?: StrokeLinecap
  /** Stroke color (string or gradient) */
  strokeColor?: string | string[] | ProgressGradient
  /** Trail (background) color */
  trailColor?: string
  /** Size: 'small' | 'default' | number | [width, height] */
  size?: 'small' | 'default' | number | [number, number]
  /** Success segment config */
  success?: SuccessProps
  /** Gap degree for circle/dashboard (0-295) */
  gapDegree?: number
  /** Gap position for circle/dashboard */
  gapPosition?: 'top' | 'bottom' | 'left' | 'right'
  /** Number of steps */
  steps?: number
  /** Custom format function */
  format?: (percent: number, successPercent?: number) => string
}

export const progressDefaultProps = {
  type: 'line',
  percent: 0,
  showInfo: true,
  strokeLinecap: 'round',
  size: 'default',
} as const

export interface ProgressSlots {
  default?: (props: { percent: number }) => any
  format?: (props: { percent: number }) => any
}
