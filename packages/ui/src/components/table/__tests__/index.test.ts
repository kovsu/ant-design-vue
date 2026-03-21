import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, ref } from 'vue'
import Table from '../Table.vue'
import type { ColumnsType, Key } from '../types'

interface DataType {
  key: string
  name: string
  age: number
  address: string
}

const basicColumns: ColumnsType<DataType> = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
]

const basicData: DataType[] = [
  { key: '1', name: 'John Brown', age: 32, address: 'New York' },
  { key: '2', name: 'Jim Green', age: 42, address: 'London' },
  { key: '3', name: 'Joe Black', age: 32, address: 'Sydney' },
]

describe('Table', () => {
  it('renders basic table', () => {
    const wrapper = mount(Table, {
      props: { columns: basicColumns, dataSource: basicData },
    })
    expect(wrapper.find('.ant-table').exists()).toBe(true)
    expect(wrapper.findAll('.ant-table-thead th').length).toBe(3)
    expect(wrapper.findAll('.ant-table-tbody tr.ant-table-row').length).toBe(3)
  })

  it('renders with empty data', () => {
    const wrapper = mount(Table, {
      props: { columns: basicColumns, dataSource: [] },
    })
    expect(wrapper.find('.ant-table-placeholder').exists()).toBe(true)
  })

  it('renders bordered table', () => {
    const wrapper = mount(Table, {
      props: { columns: basicColumns, dataSource: basicData, bordered: true },
    })
    expect(wrapper.find('.ant-table-bordered').exists()).toBe(true)
  })

  it('renders different sizes', () => {
    for (const size of ['small', 'middle', 'large'] as const) {
      const wrapper = mount(Table, {
        props: { columns: basicColumns, dataSource: basicData, size },
      })
      expect(wrapper.find(`.ant-table-${size}`).exists()).toBe(true)
    }
  })

  it('hides header when showHeader is false', () => {
    const wrapper = mount(Table, {
      props: { columns: basicColumns, dataSource: basicData, showHeader: false },
    })
    expect(wrapper.find('.ant-table-thead').exists()).toBe(false)
  })

  it('disables pagination when set to false', () => {
    const wrapper = mount(Table, {
      props: { columns: basicColumns, dataSource: basicData, pagination: false },
    })
    expect(wrapper.find('.ant-table-pagination').exists()).toBe(false)
  })

  // Sorting
  it('sorts data on header click', async () => {
    const columns: ColumnsType<DataType> = [
      { title: 'Name', dataIndex: 'name', sorter: (a, b) => a.name.localeCompare(b.name) },
      { title: 'Age', dataIndex: 'age' },
    ]
    const wrapper = mount(Table, {
      props: { columns, dataSource: basicData },
    })

    const sorterTh = wrapper.find('.ant-table-column-has-sorters')
    expect(sorterTh.exists()).toBe(true)

    await sorterTh.trigger('click')
    await nextTick()

    // After first click, should be ascending
    const rows = wrapper.findAll('.ant-table-tbody tr.ant-table-row')
    const firstCellText = rows[0]?.find('td')?.text()
    // Jim Green should come first alphabetically
    expect(firstCellText).toBe('Jim Green')
  })

  // Row Selection
  it('renders checkbox selection', () => {
    const wrapper = mount(Table, {
      props: {
        columns: basicColumns,
        dataSource: basicData,
        rowSelection: { type: 'checkbox' },
      },
    })
    // Selection column should be added
    expect(wrapper.findAll('.ant-checkbox').length).toBeGreaterThan(0)
  })

  it('renders radio selection', () => {
    const wrapper = mount(Table, {
      props: {
        columns: basicColumns,
        dataSource: basicData,
        rowSelection: { type: 'radio' },
      },
    })
    expect(wrapper.findAll('.ant-radio').length).toBe(3)
  })

  it('toggles row selection on checkbox click', async () => {
    const onChange = vi.fn()
    const wrapper = mount(Table, {
      props: {
        columns: basicColumns,
        dataSource: basicData,
        rowSelection: { onChange },
      },
    })

    const firstCheckbox = wrapper.findAll('.ant-checkbox-input')[1] // Skip header
    await firstCheckbox.setValue(true)
    await nextTick()

    expect(onChange).toHaveBeenCalled()
  })

  // Expandable
  it('renders expandable rows', async () => {
    const wrapper = mount(Table, {
      props: {
        columns: basicColumns,
        dataSource: basicData,
      },
      slots: {
        expandedRowRender: ({ record }: any) => `Details for ${record.name}`,
      },
    })

    expect(wrapper.findAll('.ant-table-row-expand-icon').length).toBe(3)

    // Click to expand first row
    const expandIcon = wrapper.find('.ant-table-row-expand-icon-collapsed')
    await expandIcon.trigger('click')
    await nextTick()

    expect(wrapper.find('.ant-table-expanded-row').exists()).toBe(true)
  })

  // Tree data
  it('renders tree data', () => {
    const treeData = [
      {
        key: '1',
        name: 'Parent',
        age: 60,
        address: 'Address',
        children: [
          { key: '1-1', name: 'Child', age: 30, address: 'Address 2' },
        ],
      },
    ]

    const wrapper = mount(Table, {
      props: {
        columns: basicColumns,
        dataSource: treeData,
        defaultExpandAllRows: true,
      },
    })

    // Should render both parent and child
    expect(wrapper.findAll('.ant-table-tbody tr.ant-table-row').length).toBe(2)
    // Child should have indent level 1
    expect(wrapper.find('.ant-table-row-level-1').exists()).toBe(true)
  })

  // Custom row class
  it('applies rowClassName', () => {
    const wrapper = mount(Table, {
      props: {
        columns: basicColumns,
        dataSource: basicData,
        rowClassName: (_record: DataType, index: number) => index % 2 === 0 ? 'even-row' : 'odd-row',
      },
    })
    expect(wrapper.find('.even-row').exists()).toBe(true)
    expect(wrapper.find('.odd-row').exists()).toBe(true)
  })

  // onChange event
  it('emits change event on sort', async () => {
    const columns: ColumnsType<DataType> = [
      { title: 'Age', dataIndex: 'age', sorter: (a, b) => a.age - b.age },
    ]
    const wrapper = mount(Table, {
      props: { columns, dataSource: basicData },
    })

    await wrapper.find('.ant-table-column-has-sorters').trigger('click')
    await nextTick()

    const changeEvents = wrapper.emitted('change')
    expect(changeEvents).toBeTruthy()
    expect(changeEvents![0][3]).toEqual(
      expect.objectContaining({ action: 'sort' }),
    )
  })
})
