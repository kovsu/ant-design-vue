/**
 * Format a number with group separators and decimal handling.
 */
export function formatNumber(
  value: number | string,
  options: {
    decimalSeparator?: string
    groupSeparator?: string
    precision?: number
  } = {},
): { int: string; decimal: string } {
  const { decimalSeparator = '.', groupSeparator = ',', precision } = options

  let numStr = String(value)

  // Handle precision
  if (precision !== undefined) {
    numStr = Number(value).toFixed(precision)
  }

  // Split integer and decimal
  const [intPart, decPart] = numStr.split('.')

  // Add group separators to integer part
  const int = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator)
  const decimal = decPart ? `${decimalSeparator}${decPart}` : ''

  return { int, decimal }
}

/**
 * Parse a countdown target value to a timestamp in milliseconds.
 */
export function getTime(value?: number | string | Date): number {
  if (value instanceof Date) return value.getTime()
  if (typeof value === 'string') return new Date(value).getTime()
  return Number(value) || 0
}

/**
 * Format a countdown diff (ms) into a display string using the given format pattern.
 *
 * Supported tokens:
 *   DD / D  — days
 *   HH / H  — hours
 *   mm / m  — minutes
 *   ss / s  — seconds
 *   SSS / SS / S — milliseconds (3-digit / 2-digit / 1-digit)
 */
export function formatCountdown(diff: number, format: string): string {
  if (diff <= 0) diff = 0

  const SECOND = 1000
  const MINUTE = 60 * SECOND
  const HOUR = 60 * MINUTE
  const DAY = 24 * HOUR

  let d = Math.floor(diff / DAY)
  let h = Math.floor((diff % DAY) / HOUR)
  let m = Math.floor((diff % HOUR) / MINUTE)
  let s = Math.floor((diff % MINUTE) / SECOND)
  const ms = Math.floor(diff % SECOND)

  // If format doesn't include days, roll days into hours
  if (!/D/.test(format)) {
    h += d * 24
    d = 0
  }
  // If format doesn't include hours, roll hours into minutes
  if (!/H/.test(format)) {
    m += h * 60
    h = 0
  }
  // If format doesn't include minutes, roll minutes into seconds
  if (!/m/.test(format)) {
    s += m * 60
    m = 0
  }

  return format
    .replace(/DD/g, String(d).padStart(2, '0'))
    .replace(/D/g, String(d))
    .replace(/HH/g, String(h).padStart(2, '0'))
    .replace(/H/g, String(h))
    .replace(/mm/g, String(m).padStart(2, '0'))
    .replace(/m/g, String(m))
    .replace(/ss/g, String(s).padStart(2, '0'))
    .replace(/s/g, String(s))
    .replace(/SSS/g, String(ms).padStart(3, '0'))
    .replace(/SS/g, String(Math.floor(ms / 10)).padStart(2, '0'))
    .replace(/S/g, String(Math.floor(ms / 100)))
}
