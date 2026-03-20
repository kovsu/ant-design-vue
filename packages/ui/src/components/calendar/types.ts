import type { Dayjs } from 'dayjs'
import type { Slot, ScopedSlot } from '@/utils/types'

export type CalendarMode = 'month' | 'year'

export interface SelectInfo {
  source: 'year' | 'month' | 'date' | 'customize'
}

export interface HeaderRenderParams {
  value: Dayjs
  type: CalendarMode
  onChange: (date: Dayjs) => void
  onTypeChange: (type: CalendarMode) => void
}

export interface CalendarProps {
  /** Current value */
  value?: Dayjs | string | null
  /** Default value */
  defaultValue?: Dayjs | string | null
  /** Calendar mode */
  mode?: CalendarMode
  /** Whether to display fullscreen */
  fullscreen?: boolean
  /** Disabled dates */
  disabledDate?: (date: Dayjs) => boolean
  /** Valid date range */
  validRange?: [Dayjs, Dayjs]
  /** Value format (when set, value is string) */
  valueFormat?: string
}

export const calendarDefaultProps = {
  fullscreen: true,
} as const

export interface CalendarEmits {
  (e: 'update:value', value: Dayjs | string | null): void
  (e: 'change', value: Dayjs | string | null): void
  (e: 'panelChange', value: Dayjs | string | null, mode: CalendarMode): void
  (e: 'select', date: Dayjs, info: SelectInfo): void
}

export interface CalendarSlots {
  /** Custom rendering for date cells */
  dateCellRender?: ScopedSlot<{ current: Dayjs }>
  /** Full custom rendering for date cells (replaces default content) */
  dateFullCellRender?: ScopedSlot<{ current: Dayjs }>
  /** Custom rendering for month cells */
  monthCellRender?: ScopedSlot<{ current: Dayjs }>
  /** Full custom rendering for month cells */
  monthFullCellRender?: ScopedSlot<{ current: Dayjs }>
  /** Custom header rendering */
  headerRender?: ScopedSlot<HeaderRenderParams>
}
