export type TypographyType = 'secondary' | 'success' | 'warning' | 'danger'

export interface EllipsisConfig {
  /** Number of rows before truncating (default 1 for Text, unlimited for others) */
  rows?: number
  /** Show expand/collapse toggle */
  expandable?: boolean
  /** Custom suffix after ellipsis */
  suffix?: string
  /** Custom expand symbol (default "Expand") */
  symbol?: string
  /** Show tooltip with full text on hover */
  tooltip?: boolean
}

export interface CopyConfig {
  /** Text to copy (defaults to content text) */
  text?: string
  /** Callback after copy */
  onCopy?: (event?: MouseEvent) => void
}

export interface TypographyBaseProps {
  /** Semantic type for color */
  type?: TypographyType
  /** Disabled state */
  disabled?: boolean
  /** Truncate with ellipsis */
  ellipsis?: boolean | EllipsisConfig
  /** Show copy button */
  copyable?: boolean | CopyConfig
  /** Bold text */
  strong?: boolean
  /** Underline */
  underline?: boolean
  /** Strikethrough */
  delete?: boolean
  /** Code style */
  code?: boolean
  /** Highlight mark */
  mark?: boolean
  /** Keyboard style */
  keyboard?: boolean
  /** Italic */
  italic?: boolean
}

export interface TextProps extends TypographyBaseProps {}

export interface TitleProps extends Omit<TypographyBaseProps, 'strong'> {
  /** Heading level 1-5 */
  level?: 1 | 2 | 3 | 4 | 5
}

export const titleDefaultProps = {
  level: 1,
} as const

export interface ParagraphProps extends TypographyBaseProps {}

export interface LinkProps extends TypographyBaseProps {
  href?: string
  target?: string
}
