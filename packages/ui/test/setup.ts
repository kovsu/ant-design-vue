import { vi } from 'vitest'
import { config } from '@vue/test-utils'
import createFetchMock from 'vitest-fetch-mock'
import UI from '../src'

const fetchMock = createFetchMock(vi)
fetchMock.enableMocks()

config.global.plugins = [UI]
