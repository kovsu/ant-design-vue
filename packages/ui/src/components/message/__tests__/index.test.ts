import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { message } from '@ant-design-vue/ui'

describe('message', () => {
  beforeEach(() => {
    message.destroy()
  })

  afterEach(() => {
    message.destroy()
  })

  it('has info method', () => {
    expect(typeof message.info).toBe('function')
  })

  it('has success method', () => {
    expect(typeof message.success).toBe('function')
  })

  it('has error method', () => {
    expect(typeof message.error).toBe('function')
  })

  it('has warning method', () => {
    expect(typeof message.warning).toBe('function')
  })

  it('has loading method', () => {
    expect(typeof message.loading).toBe('function')
  })

  it('has open method', () => {
    expect(typeof message.open).toBe('function')
  })

  it('has destroy method', () => {
    expect(typeof message.destroy).toBe('function')
  })

  it('has config method', () => {
    expect(typeof message.config).toBe('function')
  })

  it('returns a destroy function', () => {
    const destroy = message.info('Test')
    expect(typeof destroy).toBe('function')
  })

  it('returns a thenable', () => {
    const result = message.info('Test')
    expect(typeof result.then).toBe('function')
  })
})
