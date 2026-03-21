import type { ScopedSlot } from '@/utils/types'

export type TourPlacement =
  | 'top'
  | 'topLeft'
  | 'topRight'
  | 'bottom'
  | 'bottomLeft'
  | 'bottomRight'
  | 'left'
  | 'leftTop'
  | 'leftBottom'
  | 'right'
  | 'rightTop'
  | 'rightBottom'

export interface TourStepButtonProps {
  /** Button text */
  children?: string
  /** Click handler */
  onClick?: () => void
}

export interface TourStepInfo {
  /** Step title */
  title: string
  /** Step description */
  description?: string
  /** Cover image URL */
  cover?: string
  /** Function returning the target element for this step */
  target?: () => HTMLElement | null
  /** Placement of the popover relative to the target */
  placement?: TourPlacement
  /** Whether to show mask for this step */
  mask?: boolean | { color?: string }
  /** Whether to show arrow for this step */
  arrow?: boolean | { pointAtCenter: boolean }
  /** Step type override */
  type?: 'default' | 'primary'
  /** Props for the next button */
  nextButtonProps?: TourStepButtonProps
  /** Props for the prev button */
  prevButtonProps?: TourStepButtonProps
}

export interface TourProps {
  /** Array of step definitions */
  steps: TourStepInfo[]
  /** Controls visibility (v-model:open) */
  open?: boolean
  /** Current step index (v-model:current) */
  current?: number
  /** Tour type */
  type?: 'default' | 'primary'
  /** Show mask overlay */
  mask?: boolean | { color?: string }
  /** Show arrow pointing at target */
  arrow?: boolean | { pointAtCenter: boolean }
  /** Default placement for all steps */
  placement?: TourPlacement
  /** Custom container for the tour */
  getPopupContainer?: () => HTMLElement
  /** Z-index of the tour overlay */
  zIndex?: number
}

export const tourDefaultProps = {
  type: 'default',
  mask: true,
  arrow: true,
  placement: 'bottom',
  zIndex: 1001,
} as const

export interface TourEmits {
  (e: 'update:open', open: boolean): void
  (e: 'update:current', current: number): void
  (e: 'change', current: number): void
  (e: 'close', current: number): void
  (e: 'finish'): void
}

export interface TourSlots {
  /** Custom indicators renderer */
  indicatorsRender?: ScopedSlot<{ current: number; total: number }>
}
