import { vi } from 'vitest'
import { config } from '@vue/test-utils'
import createFetchMock from 'vitest-fetch-mock'
import UI from '../src'

const fetchMock = createFetchMock(vi)
fetchMock.enableMocks()

// Mock window.matchMedia for jsdom
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

config.global.plugins = [UI]
