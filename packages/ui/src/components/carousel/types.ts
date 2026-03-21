import type { Slot } from '@/utils/types'

export type CarouselEffect = 'scrollx' | 'fade'
export type DotPosition = 'top' | 'bottom' | 'left' | 'right'

export interface CarouselProps {
  /** Transition effect */
  effect?: CarouselEffect
  /** Show dot indicators */
  dots?: boolean
  /** Dots position */
  dotPosition?: DotPosition
  /** Auto-rotate slides */
  autoplay?: boolean
  /** Auto-rotate interval in ms */
  autoplaySpeed?: number
  /** Pause autoplay on hover */
  pauseOnHover?: boolean
  /** Transition speed in ms */
  speed?: number
  /** CSS easing function */
  easing?: string
  /** Enable infinite loop */
  infinite?: boolean
  /** Initial slide index */
  initialSlide?: number
  /** Enable swipe/drag on touch devices */
  swipeable?: boolean
}

export const carouselDefaultProps = {
  effect: 'scrollx' as const,
  dots: true,
  dotPosition: 'bottom' as const,
  autoplay: false,
  autoplaySpeed: 3000,
  pauseOnHover: true,
  speed: 500,
  easing: 'ease',
  infinite: true,
  initialSlide: 0,
  swipeable: true,
} as const

export interface CarouselEmits {
  (e: 'beforeChange', from: number, to: number): void
  (e: 'afterChange', current: number): void
}

export interface CarouselSlots {
  default?: Slot
}

export interface CarouselRef {
  goTo: (slide: number, animate?: boolean) => void
  next: () => void
  prev: () => void
}
