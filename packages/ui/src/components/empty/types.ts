export interface EmptyProps {
  /** Custom description text */
  description?: string | false
  /** Custom image (as URL string) */
  image?: string
  /** Image style override */
  imageStyle?: Record<string, string>
}

export const emptyDefaultProps = {} as const

export interface EmptySlots {
  default?: (props: Record<string, never>) => any
  description?: (props: Record<string, never>) => any
  image?: (props: Record<string, never>) => any
}
