import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import Circle from '../demo/circle.vue'
import Dashboard from '../demo/dashboard.vue'
import Gradient from '../demo/gradient.vue'
import Steps from '../demo/steps.vue'
import Small from '../demo/small.vue'
import Line from '../demo/line.vue'
import CircleBasic from '../demo/circle-basic.vue'
import LineMini from '../demo/line-mini.vue'
import CircleMini from '../demo/circle-mini.vue'
import Dynamic from '../demo/dynamic.vue'
import CircleDynamic from '../demo/circle-dynamic.vue'
import Format from '../demo/format.vue'
import Linecap from '../demo/linecap.vue'
import GradientLine from '../demo/gradient-line.vue'
import Size from '../demo/size.vue'
import SuccessSegment from '../demo/success-segment.vue'

const demos = {
  Basic,
  Circle,
  Dashboard,
  Gradient,
  Steps,
  Small,
  Line,
  CircleBasic,
  LineMini,
  CircleMini,
  Dynamic,
  CircleDynamic,
  Format,
  Linecap,
  GradientLine,
  Size,
  SuccessSegment,
}

describe('Progress demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
