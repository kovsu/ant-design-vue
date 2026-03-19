import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import LegacyType from '../demo/legacy-type.vue'
import Size from '../demo/size.vue'
import Disabled from '../demo/disabled.vue'
import Loading from '../demo/loading.vue'
import Danger from '../demo/danger.vue'
import Ghost from '../demo/ghost.vue'
import Block from '../demo/block.vue'
import Shape from '../demo/shape.vue'
import Href from '../demo/href.vue'

const demos = {
  Basic,
  LegacyType,
  Size,
  Disabled,
  Loading,
  Danger,
  Ghost,
  Block,
  Shape,
  Href,
}

describe('Button demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component, { global: { stubs: { Wave: true } } })
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
