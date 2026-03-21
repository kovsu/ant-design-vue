import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import Bordered from '../demo/bordered.vue'
import Size from '../demo/size.vue'
import Selection from '../demo/selection.vue'
import Sorter from '../demo/sorter.vue'
import Filter from '../demo/filter.vue'
import FixedColumns from '../demo/fixed-columns.vue'
import Expandable from '../demo/expandable.vue'
import TreeData from '../demo/tree-data.vue'
import Pagination from '../demo/pagination.vue'
import Summary from '../demo/summary.vue'
import CustomCell from '../demo/custom-cell.vue'

const demos = {
  Basic,
  Bordered,
  Size,
  Selection,
  Sorter,
  Filter,
  FixedColumns,
  Expandable,
  TreeData,
  Pagination,
  Summary,
  CustomCell,
}

describe('Table demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
