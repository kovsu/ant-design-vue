import type { Slot } from '@/utils/types'
import type { InjectionKey, Ref } from 'vue'

export type StepStatus = 'wait' | 'process' | 'finish' | 'error'

export interface StepsProps {
  /** Current active step index (zero-based) */
  current?: number
  /** Starting index for step numbering */
  initial?: number
  /** Status of the current step */
  status?: StepStatus
  /** Size of the steps */
  size?: 'default' | 'small'
  /** Direction of the steps layout */
  direction?: 'horizontal' | 'vertical'
  /** Placement of labels relative to icons */
  labelPlacement?: 'horizontal' | 'vertical'
  /** Visual type of the steps */
  type?: 'default' | 'navigation'
  /** Progress percentage for the current step icon */
  percent?: number
}

export const stepsDefaultProps = {
  current: 0,
  initial: 0,
  status: 'process',
  size: 'default',
  direction: 'horizontal',
  labelPlacement: 'horizontal',
  type: 'default',
} as const

export interface StepsEmits {
  (e: 'update:current', current: number): void
  (e: 'change', current: number): void
}

export interface StepsSlots {
  default?: Slot
}

export interface StepProps {
  /** Title of the step */
  title?: string
  /** Subtitle of the step */
  subTitle?: string
  /** Description of the step */
  description?: string
  /** Override the automatically determined status */
  status?: StepStatus
  /** Whether the step is disabled (not clickable) */
  disabled?: boolean
}

export interface StepSlots {
  default?: Slot
  title?: Slot
  subTitle?: Slot
  description?: Slot
  icon?: Slot
}

/** Context provided by Steps to each Step child */
export interface StepsContextType {
  current: Ref<number>
  status: Ref<StepStatus>
  size: Ref<'default' | 'small'>
  direction: Ref<'horizontal' | 'vertical'>
  labelPlacement: Ref<'horizontal' | 'vertical'>
  percent: Ref<number | undefined>
  onStepClick?: (index: number) => void
  registerStep: () => number
  unregisterStep: (index: number) => void
}

export const stepsContextKey: InjectionKey<StepsContextType> = Symbol('stepsContext')
