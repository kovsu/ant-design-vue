export interface SpinProps {
  /** Whether to show spinning state */
  spinning?: boolean
  /** Size of spinner */
  size?: 'small' | 'default' | 'large'
  /** Loading tip text */
  tip?: string
  /** Delay in ms before showing spinner */
  delay?: number
}

export const spinDefaultProps = {
  spinning: true,
  size: 'default',
} as const

export interface SpinSlots {
  default?: (props: Record<string, never>) => any
  tip?: (props: Record<string, never>) => any
  indicator?: (props: Record<string, never>) => any
}
