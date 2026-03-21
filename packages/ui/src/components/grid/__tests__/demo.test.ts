import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import Gutter from '../demo/gutter.vue'
import Flex from '../demo/flex.vue'
import Offset from '../demo/offset.vue'
import FlexAlign from '../demo/flex-align.vue'
import FlexOrder from '../demo/flex-order.vue'
import FlexStretch from '../demo/flex-stretch.vue'
import Responsive from '../demo/responsive.vue'
import ResponsiveMore from '../demo/responsive-more.vue'
import Sort from '../demo/sort.vue'
import UseBreakpoint from '../demo/use-breakpoint.vue'
import Playground from '../demo/playground.vue'

const demos = {
  Basic,
  Gutter,
  Flex,
  Offset,
  FlexAlign,
  FlexOrder,
  FlexStretch,
  Responsive,
  ResponsiveMore,
  Sort,
  UseBreakpoint,
  Playground,
}

describe('Grid demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
