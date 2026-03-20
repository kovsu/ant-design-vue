import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { notification } from '@ant-design-vue/ui'

describe('notification', () => {
  beforeEach(() => {
    notification.destroy()
  })

  afterEach(() => {
    notification.destroy()
  })

  it('has success method', () => {
    expect(typeof notification.success).toBe('function')
  })

  it('has info method', () => {
    expect(typeof notification.info).toBe('function')
  })

  it('has warning method', () => {
    expect(typeof notification.warning).toBe('function')
  })

  it('has error method', () => {
    expect(typeof notification.error).toBe('function')
  })

  it('has open method', () => {
    expect(typeof notification.open).toBe('function')
  })

  it('has close method', () => {
    expect(typeof notification.close).toBe('function')
  })

  it('has destroy method', () => {
    expect(typeof notification.destroy).toBe('function')
  })

  it('has config method', () => {
    expect(typeof notification.config).toBe('function')
  })
})
