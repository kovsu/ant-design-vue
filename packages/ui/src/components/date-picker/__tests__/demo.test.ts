import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import Range from '../demo/range.vue'
import Size from '../demo/size.vue'
import Disabled from '../demo/disabled.vue'
import Format from '../demo/format.vue'
import Mode from '../demo/mode.vue'
import Time from '../demo/time.vue'
import Presets from '../demo/presets.vue'
import Status from '../demo/status.vue'

const demos = { Basic, Range, Size, Disabled, Format, Mode, Time, Presets, Status }

describe('DatePicker demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
