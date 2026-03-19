export type PresetStatusColor = 'success' | 'processing' | 'error' | 'default' | 'warning'

export interface BadgeProps {
  /** Number to show in badge */
  count?: number | string
  /** Show badge when count is zero */
  showZero?: boolean
  /** Max count to show, displays `${overflowCount}+` when exceeded */
  overflowCount?: number
  /** Show as dot instead of number */
  dot?: boolean
  /** Status dot */
  status?: PresetStatusColor
  /** Custom badge color */
  color?: string
  /** Text to show next to status dot */
  text?: string
  /** Badge size */
  size?: 'default' | 'small'
  /** Offset of badge [right, top] */
  offset?: [number | string, number | string]
  /** Title attribute */
  title?: string
  /** Custom number style */
  numberStyle?: Record<string, string>
}

export const badgeDefaultProps = {
  overflowCount: 99,
  showZero: false,
  dot: false,
  size: 'default',
} as const

export interface BadgeSlots {
  default?: (props: Record<string, never>) => any
  count?: (props: Record<string, never>) => any
  text?: (props: Record<string, never>) => any
}

export interface RibbonProps {
  /** Ribbon color */
  color?: string
  /** Ribbon text */
  text?: string
  /** Ribbon placement */
  placement?: 'start' | 'end'
}

export const ribbonDefaultProps = {
  placement: 'end',
} as const

export interface RibbonSlots {
  default?: (props: Record<string, never>) => any
  text?: (props: Record<string, never>) => any
}

const PRESET_STATUS_COLORS = ['success', 'processing', 'error', 'default', 'warning']
export function isPresetStatus(status?: string): boolean {
  return !!status && PRESET_STATUS_COLORS.includes(status)
}

const PRESET_COLORS = [
  'pink',
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple',
  'geekblue',
  'magenta',
  'volcano',
  'gold',
  'lime',
]
export function isPresetColor(color?: string): boolean {
  return !!color && PRESET_COLORS.includes(color)
}
