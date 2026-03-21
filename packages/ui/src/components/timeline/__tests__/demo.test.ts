import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Timeline from '../Timeline.vue'
import TimelineItem from '../TimelineItem.vue'
import Basic from '../demo/basic.vue'
import Alternate from '../demo/alternate.vue'
import Color from '../demo/color.vue'
import Custom from '../demo/custom.vue'
import Pending from '../demo/pending.vue'
import Right from '../demo/right.vue'
import Label from '../demo/label.vue'

const globalComponents = {
  ATimeline: Timeline,
  ATimelineItem: TimelineItem,
}

const demos = { Basic, Alternate, Color, Custom, Pending, Right, Label }

describe('Timeline demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component, {
        global: { components: globalComponents },
      })
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
