import { describe, expect, it, vi } from 'vitest'
import { Pagination } from '@ant-design-vue/ui'
import { mount } from '@vue/test-utils'

describe('Pagination', () => {
  it('renders correctly', () => {
    const wrapper = mount(Pagination, {
      props: { total: 50, current: 1 },
    })
    expect(wrapper.find('.ant-pagination').exists()).toBe(true)
  })

  it('renders correct number of page items for small total', () => {
    const wrapper = mount(Pagination, {
      props: { total: 50, current: 1, pageSize: 10 },
    })
    // 5 pages, all shown
    const items = wrapper.findAll('.ant-pagination-item')
    expect(items).toHaveLength(5)
  })

  it('renders ellipsis for many pages', () => {
    const wrapper = mount(Pagination, {
      props: { total: 500, current: 1, pageSize: 10 },
    })
    expect(wrapper.find('.ant-pagination-jump-next').exists()).toBe(true)
  })

  it('highlights active page', () => {
    const wrapper = mount(Pagination, {
      props: { total: 50, current: 3, pageSize: 10 },
    })
    const activeItem = wrapper.find('.ant-pagination-item-active')
    expect(activeItem.exists()).toBe(true)
    expect(activeItem.text()).toBe('3')
  })

  it('emits change on page click', async () => {
    const wrapper = mount(Pagination, {
      props: { total: 50, current: 1, pageSize: 10 },
    })
    const items = wrapper.findAll('.ant-pagination-item button')
    await items[1].trigger('click') // Click page 2
    expect(wrapper.emitted('change')?.[0]).toEqual([2, 10])
    expect(wrapper.emitted('update:current')?.[0]).toEqual([2])
  })

  it('emits change on prev click', async () => {
    const wrapper = mount(Pagination, {
      props: { total: 50, current: 3, pageSize: 10 },
    })
    await wrapper.find('.ant-pagination-prev button').trigger('click')
    expect(wrapper.emitted('change')?.[0]).toEqual([2, 10])
  })

  it('emits change on next click', async () => {
    const wrapper = mount(Pagination, {
      props: { total: 50, current: 1, pageSize: 10 },
    })
    await wrapper.find('.ant-pagination-next button').trigger('click')
    expect(wrapper.emitted('change')?.[0]).toEqual([2, 10])
  })

  it('disables prev on first page', () => {
    const wrapper = mount(Pagination, {
      props: { total: 50, current: 1, pageSize: 10 },
    })
    expect(wrapper.find('.ant-pagination-prev button').attributes('disabled')).toBeDefined()
  })

  it('disables next on last page', () => {
    const wrapper = mount(Pagination, {
      props: { total: 50, current: 5, pageSize: 10 },
    })
    expect(wrapper.find('.ant-pagination-next button').attributes('disabled')).toBeDefined()
  })

  it('hides when hideOnSinglePage and only one page', () => {
    const wrapper = mount(Pagination, {
      props: { total: 5, current: 1, pageSize: 10, hideOnSinglePage: true },
    })
    expect(wrapper.find('.ant-pagination').exists()).toBe(false)
  })

  it('shows when hideOnSinglePage but multiple pages', () => {
    const wrapper = mount(Pagination, {
      props: { total: 50, current: 1, pageSize: 10, hideOnSinglePage: true },
    })
    expect(wrapper.find('.ant-pagination').exists()).toBe(true)
  })

  it('renders simple mode', () => {
    const wrapper = mount(Pagination, {
      props: { total: 50, current: 1, simple: true },
    })
    expect(wrapper.find('.ant-pagination-simple').exists()).toBe(true)
    expect(wrapper.find('.ant-pagination-simple-pager').exists()).toBe(true)
  })

  it('renders small size', () => {
    const wrapper = mount(Pagination, {
      props: { total: 50, current: 1, size: 'small' },
    })
    expect(wrapper.find('.ant-pagination-small').exists()).toBe(true)
  })

  it('renders size changer when showSizeChanger', () => {
    const wrapper = mount(Pagination, {
      props: { total: 50, current: 1, showSizeChanger: true },
    })
    expect(wrapper.find('.ant-pagination-options-size-changer').exists()).toBe(true)
  })

  it('renders quick jumper when showQuickJumper', () => {
    const wrapper = mount(Pagination, {
      props: { total: 50, current: 1, showQuickJumper: true },
    })
    expect(wrapper.find('.ant-pagination-options-quick-jumper').exists()).toBe(true)
  })

  it('renders total when showTotal provided', () => {
    const wrapper = mount(Pagination, {
      props: {
        total: 50,
        current: 1,
        showTotal: (total: number) => `Total ${total} items`,
      },
    })
    expect(wrapper.find('.ant-pagination-total-text').text()).toBe('Total 50 items')
  })

  it('disables all buttons when disabled', () => {
    const wrapper = mount(Pagination, {
      props: { total: 50, current: 1, disabled: true },
    })
    expect(wrapper.find('.ant-pagination-disabled').exists()).toBe(true)
    const buttons = wrapper.findAll('button')
    buttons.forEach((btn) => {
      expect(btn.attributes('disabled')).toBeDefined()
    })
  })

  it('has proper aria attributes', () => {
    const wrapper = mount(Pagination, {
      props: { total: 50, current: 1 },
    })
    expect(wrapper.find('nav').attributes('role')).toBe('navigation')
    expect(wrapper.find('nav').attributes('aria-label')).toBe('Pagination')
    expect(wrapper.find('.ant-pagination-item-active button').attributes('aria-current')).toBe('page')
  })
})
