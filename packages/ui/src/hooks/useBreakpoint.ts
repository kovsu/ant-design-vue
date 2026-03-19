import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

export type ScreenMap = Partial<Record<Breakpoint, boolean>>

/** Ordered from largest to smallest — resolution order */
export const responsiveArray: Breakpoint[] = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs']

/** Media queries for each breakpoint */
export const breakpointMap: Record<Breakpoint, string> = {
  xs: '(max-width: 575.98px)',
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
  xxl: '(min-width: 1600px)',
}

/**
 * Tracks which responsive breakpoints are currently active.
 * SSR-safe: returns empty map until mounted.
 */
export function useBreakpoint(): Ref<ScreenMap> {
  const screens = ref<ScreenMap>({})
  const mediaQueryLists: Partial<Record<Breakpoint, MediaQueryList>> = {}

  onMounted(() => {
    const entries = Object.entries(breakpointMap) as [Breakpoint, string][]
    for (const [bp, query] of entries) {
      const mql = window.matchMedia(query)
      mediaQueryLists[bp] = mql
      screens.value[bp] = mql.matches

      const handler = (e: MediaQueryListEvent) => {
        screens.value = { ...screens.value, [bp]: e.matches }
      }
      mql.addEventListener('change', handler)
      // Store handler for cleanup
      ;(mql as any)._handler = handler
    }
  })

  onUnmounted(() => {
    for (const [bp, mql] of Object.entries(mediaQueryLists)) {
      if (mql) {
        mql.removeEventListener('change', (mql as any)._handler)
      }
    }
  })

  return screens
}

/**
 * Resolves a responsive value (object with breakpoint keys) to the current value.
 * Falls back from largest matching breakpoint to smallest.
 */
export function resolveResponsiveValue<T>(
  screens: ScreenMap,
  responsiveValue: Partial<Record<Breakpoint, T>>,
): T | undefined {
  for (const bp of responsiveArray) {
    if (screens[bp] && responsiveValue[bp] !== undefined) {
      return responsiveValue[bp]
    }
  }
  return undefined
}
