import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import Text from '../demo/text.vue'
import Size from '../demo/size.vue'
import Loading from '../demo/loading.vue'
import Disabled from '../demo/disabled.vue'

const demos = {
  Basic,
  Text,
  Size,
  Loading,
  Disabled,
}

describe('Switch demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
