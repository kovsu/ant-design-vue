import { describe, expect, it } from 'vitest'
import { Transfer } from '@ant-design-vue/ui'
import { mount } from '@vue/test-utils'

const generateData = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    key: `item-${i + 1}`,
    title: `Item ${i + 1}`,
    description: `Description of item ${i + 1}`,
    disabled: false,
  }))

describe('Transfer', () => {
  it('should render correctly', () => {
    const wrapper = mount(Transfer, {
      props: {
        dataSource: generateData(5),
        targetKeys: ['item-3'],
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders two panels', () => {
    const wrapper = mount(Transfer, {
      props: {
        dataSource: generateData(5),
        targetKeys: [],
      },
    })
    expect(wrapper.findAll('.ant-transfer-list')).toHaveLength(2)
  })

  it('splits items between source and target panels', () => {
    const wrapper = mount(Transfer, {
      props: {
        dataSource: generateData(5),
        targetKeys: ['item-2', 'item-4'],
      },
    })
    const lists = wrapper.findAll('.ant-transfer-list')
    const sourceItems = lists[0].findAll('.ant-transfer-list-content-item')
    const targetItems = lists[1].findAll('.ant-transfer-list-content-item')
    expect(sourceItems).toHaveLength(3)
    expect(targetItems).toHaveLength(2)
  })

  it('selects items on click', async () => {
    const wrapper = mount(Transfer, {
      props: {
        dataSource: generateData(5),
        targetKeys: [],
        selectedKeys: [],
      },
    })
    const sourceItems = wrapper.findAll('.ant-transfer-list')[0].findAll('.ant-transfer-list-content-item')
    await sourceItems[0].trigger('click')

    expect(wrapper.emitted('update:selectedKeys')).toBeTruthy()
    expect(wrapper.emitted('update:selectedKeys')![0][0]).toEqual(['item-1'])
  })

  it('moves selected items to the right', async () => {
    const wrapper = mount(Transfer, {
      props: {
        dataSource: generateData(5),
        targetKeys: [],
        selectedKeys: ['item-1', 'item-2'],
      },
    })

    const buttons = wrapper.findAll('.ant-transfer-operation button')
    const moveRightBtn = buttons[0]
    await moveRightBtn.trigger('click')

    expect(wrapper.emitted('update:targetKeys')).toBeTruthy()
    expect(wrapper.emitted('update:targetKeys')![0][0]).toEqual(['item-1', 'item-2'])
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')![0][1]).toBe('right')
  })

  it('moves selected items to the left', async () => {
    const wrapper = mount(Transfer, {
      props: {
        dataSource: generateData(5),
        targetKeys: ['item-3', 'item-4'],
        selectedKeys: ['item-3'],
      },
    })

    const buttons = wrapper.findAll('.ant-transfer-operation button')
    const moveLeftBtn = buttons[1]
    await moveLeftBtn.trigger('click')

    expect(wrapper.emitted('update:targetKeys')).toBeTruthy()
    expect(wrapper.emitted('update:targetKeys')![0][0]).toEqual(['item-4'])
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')![0][1]).toBe('left')
  })

  it('renders search input when showSearch is true', () => {
    const wrapper = mount(Transfer, {
      props: {
        dataSource: generateData(5),
        targetKeys: [],
        showSearch: true,
      },
    })
    expect(wrapper.findAll('.ant-transfer-list-search')).toHaveLength(2)
  })

  it('filters items based on search input', async () => {
    const wrapper = mount(Transfer, {
      props: {
        dataSource: generateData(10),
        targetKeys: [],
        showSearch: true,
      },
    })

    const searchInput = wrapper.find('.ant-transfer-list-search-input')
    await searchInput.setValue('Item 1')
    await searchInput.trigger('input')

    // "Item 1" and "Item 10" match "Item 1"
    const sourceList = wrapper.findAll('.ant-transfer-list')[0]
    const items = sourceList.findAll('.ant-transfer-list-content-item')
    expect(items.length).toBeLessThan(10)
  })

  it('emits search event', async () => {
    const wrapper = mount(Transfer, {
      props: {
        dataSource: generateData(5),
        targetKeys: [],
        showSearch: true,
      },
    })

    const searchInput = wrapper.find('.ant-transfer-list-search-input')
    await searchInput.setValue('test')
    await searchInput.trigger('input')

    expect(wrapper.emitted('search')).toBeTruthy()
    expect(wrapper.emitted('search')![0]).toEqual(['left', 'test'])
  })

  it('select all checkbox selects all enabled items', async () => {
    const data = generateData(5)
    data[2].disabled = true

    const wrapper = mount(Transfer, {
      props: {
        dataSource: data,
        targetKeys: [],
        selectedKeys: [],
      },
    })

    const selectAllCheckbox = wrapper.findAll('.ant-transfer-list')[0].find('.ant-checkbox-input')
    await selectAllCheckbox.trigger('change')

    expect(wrapper.emitted('update:selectedKeys')).toBeTruthy()
    const selectedKeys = wrapper.emitted('update:selectedKeys')![0][0] as string[]
    expect(selectedKeys).toContain('item-1')
    expect(selectedKeys).toContain('item-2')
    expect(selectedKeys).not.toContain('item-3') // disabled
    expect(selectedKeys).toContain('item-4')
    expect(selectedKeys).toContain('item-5')
  })

  it('renders in one-way mode with delete buttons', () => {
    const wrapper = mount(Transfer, {
      props: {
        dataSource: generateData(5),
        targetKeys: ['item-2', 'item-4'],
        oneWay: true,
      },
    })

    // Only one operation button (move right)
    const opButtons = wrapper.findAll('.ant-transfer-operation button')
    expect(opButtons).toHaveLength(1)

    // Target panel should have delete buttons
    const targetList = wrapper.findAll('.ant-transfer-list')[1]
    const removeButtons = targetList.findAll('.ant-transfer-list-content-item-remove')
    expect(removeButtons).toHaveLength(2)
  })

  it('removes item in one-way mode', async () => {
    const wrapper = mount(Transfer, {
      props: {
        dataSource: generateData(5),
        targetKeys: ['item-2', 'item-4'],
        oneWay: true,
      },
    })

    const targetList = wrapper.findAll('.ant-transfer-list')[1]
    const removeBtn = targetList.find('.ant-transfer-list-content-item-remove')
    await removeBtn.trigger('click')

    expect(wrapper.emitted('update:targetKeys')).toBeTruthy()
    expect(wrapper.emitted('change')![0][1]).toBe('left')
  })

  it('disables all interactions when disabled', () => {
    const wrapper = mount(Transfer, {
      props: {
        dataSource: generateData(5),
        targetKeys: [],
        disabled: true,
      },
    })

    expect(wrapper.classes('ant-transfer-disabled')).toBe(true)

    const opButtons = wrapper.findAll('.ant-transfer-operation button')
    opButtons.forEach((btn) => {
      expect(btn.attributes('disabled')).toBeDefined()
    })
  })

  it('renders titles', () => {
    const wrapper = mount(Transfer, {
      props: {
        dataSource: generateData(5),
        targetKeys: [],
        titles: ['Source', 'Target'] as [string, string],
      },
    })

    const titles = wrapper.findAll('.ant-transfer-list-header-title')
    expect(titles[0].text()).toBe('Source')
    expect(titles[1].text()).toBe('Target')
  })

  it('shows item count in header', () => {
    const wrapper = mount(Transfer, {
      props: {
        dataSource: generateData(5),
        targetKeys: ['item-3'],
      },
    })

    const counts = wrapper.findAll('.ant-transfer-list-header-count')
    expect(counts[0].text()).toContain('4 items')
    expect(counts[1].text()).toContain('1 items')
  })

  it('shows empty state when no items', () => {
    const wrapper = mount(Transfer, {
      props: {
        dataSource: [],
        targetKeys: [],
      },
    })

    const emptyStates = wrapper.findAll('.ant-transfer-list-empty')
    expect(emptyStates).toHaveLength(2)
    expect(emptyStates[0].text()).toBe('No data')
  })

  it('does not move disabled items', async () => {
    const data = generateData(3)
    data[0].disabled = true

    const wrapper = mount(Transfer, {
      props: {
        dataSource: data,
        targetKeys: [],
        selectedKeys: ['item-1', 'item-2'],
      },
    })

    const moveRightBtn = wrapper.findAll('.ant-transfer-operation button')[0]
    await moveRightBtn.trigger('click')

    expect(wrapper.emitted('update:targetKeys')).toBeTruthy()
    // Only item-2 should be moved (item-1 is disabled)
    expect(wrapper.emitted('update:targetKeys')![0][0]).toEqual(['item-2'])
  })
})
