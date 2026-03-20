import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'

export function isSameDay(a: Dayjs | null | undefined, b: Dayjs | null | undefined): boolean {
  if (!a || !b) return false
  return a.isSame(b, 'day')
}

export function isSameMonth(a: Dayjs | null | undefined, b: Dayjs | null | undefined): boolean {
  if (!a || !b) return false
  return a.isSame(b, 'month')
}

export function isSameYear(a: Dayjs | null | undefined, b: Dayjs | null | undefined): boolean {
  if (!a || !b) return false
  return a.isSame(b, 'year')
}

export function isSameWeek(a: Dayjs | null | undefined, b: Dayjs | null | undefined): boolean {
  if (!a || !b) return false
  return a.isSame(b, 'week')
}

export function isToday(date: Dayjs): boolean {
  return date.isSame(dayjs(), 'day')
}

export function isInRange(date: Dayjs, start: Dayjs | null | undefined, end: Dayjs | null | undefined): boolean {
  if (!start || !end) return false
  return date.isAfter(start, 'day') && date.isBefore(end, 'day')
}

export function isRangeStart(date: Dayjs, start: Dayjs | null | undefined): boolean {
  if (!start) return false
  return date.isSame(start, 'day')
}

export function isRangeEnd(date: Dayjs, end: Dayjs | null | undefined): boolean {
  if (!end) return false
  return date.isSame(end, 'day')
}

/**
 * Get the dates to display in a month grid (6 rows × 7 columns).
 * Includes trailing days from the previous month and leading days from the next month.
 */
export function getMonthDates(viewDate: Dayjs): Dayjs[] {
  const firstDay = viewDate.startOf('month')
  const startOfWeek = firstDay.startOf('week')
  const dates: Dayjs[] = []
  for (let i = 0; i < 42; i++) {
    dates.push(startOfWeek.add(i, 'day'))
  }
  return dates
}

/**
 * Get the quarter for a date (1-4)
 */
export function getQuarter(date: Dayjs): number {
  return Math.floor(date.month() / 3) + 1
}

/**
 * Set the quarter of a date
 */
export function setQuarter(date: Dayjs, quarter: number): Dayjs {
  return date.month((quarter - 1) * 3)
}

/**
 * Get the years to display in a year panel (covers a decade)
 */
export function getDecadeYears(viewDate: Dayjs): number[] {
  const startYear = Math.floor(viewDate.year() / 10) * 10
  const years: number[] = []
  for (let i = startYear - 1; i <= startYear + 10; i++) {
    years.push(i)
  }
  return years
}

/**
 * Get decade range for display
 */
export function getDecadeRange(viewDate: Dayjs): [number, number] {
  const startYear = Math.floor(viewDate.year() / 10) * 10
  return [startYear, startYear + 9]
}

/**
 * Format time number to 2 digits
 */
export function padZero(n: number): string {
  return n < 10 ? `0${n}` : String(n)
}

/**
 * Generate time column options
 */
export function generateTimeOptions(count: number, step: number = 1, disabledList: number[] = []): number[] {
  const options: number[] = []
  for (let i = 0; i < count; i += step) {
    if (!disabledList.includes(i)) {
      options.push(i)
    }
  }
  return options
}
