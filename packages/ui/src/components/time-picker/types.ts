import type { Dayjs } from 'dayjs'
import type { Slot } from '@/utils/types'
import type { DisabledTimes, DateLocale } from '@/_internal/date-panel'

export type TimePickerSize = 'sm' | 'md' | 'lg'
export type TimePickerStatus = 'error' | 'warning'

export interface TimePickerProps {
  /** Current value */
  value?: Dayjs | string | null
  /** Default value */
  defaultValue?: Dayjs | string | null
  /** Open state */
  open?: boolean
  /** Default open state */
  defaultOpen?: boolean
  /** Display/parse format */
  format?: string
  /** When set, value is a formatted string instead of Dayjs */
  valueFormat?: string
  /** Show hour column */
  showHour?: boolean
  /** Show minute column */
  showMinute?: boolean
  /** Show second column */
  showSecond?: boolean
  /** 12-hour format */
  use12Hours?: boolean
  /** Hour step */
  hourStep?: number
  /** Minute step */
  minuteStep?: number
  /** Second step */
  secondStep?: number
  /** Disabled */
  disabled?: boolean
  /** Read-only input */
  inputReadOnly?: boolean
  /** Placeholder */
  placeholder?: string
  /** Allow clear */
  allowClear?: boolean
  /** Auto focus */
  autofocus?: boolean
  /** Size */
  size?: TimePickerSize
  /** Show "Now" button */
  showNow?: boolean
  /** Hide disabled options from columns */
  hideDisabledOptions?: boolean
  /** Disabled time rules */
  disabledTime?: (date: Dayjs | null) => DisabledTimes
  /** Popup container */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement
  /** Popup class name */
  popupClassName?: string
  /** Validation status */
  status?: TimePickerStatus
  /** Whether to show border */
  bordered?: boolean
}

export const timePickerDefaultProps = {
  allowClear: true,
  bordered: true,
  showNow: true,
  showHour: true,
  showMinute: true,
  showSecond: true,
  hourStep: 1,
  minuteStep: 1,
  secondStep: 1,
} as const

export interface TimePickerEmits {
  (e: 'update:value', value: Dayjs | string | null): void
  (e: 'change', value: Dayjs | string | null, timeString: string): void
  (e: 'update:open', open: boolean): void
  (e: 'openChange', open: boolean): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}

export interface TimePickerSlots {
  suffixIcon?: Slot
  clearIcon?: Slot
}

export function getDefaultTimeFormat(props: {
  showHour?: boolean
  showMinute?: boolean
  showSecond?: boolean
  use12Hours?: boolean
}): string {
  const parts: string[] = []
  if (props.showHour !== false) parts.push('HH')
  if (props.showMinute !== false) parts.push('mm')
  if (props.showSecond !== false) parts.push('ss')
  let fmt = parts.join(':')
  if (props.use12Hours) {
    fmt = fmt.replace('HH', 'hh') + ' A'
  }
  return fmt
}
