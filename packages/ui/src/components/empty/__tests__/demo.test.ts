import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import Simple from '../demo/simple.vue'
import Customize from '../demo/customize.vue'
import Description from '../demo/description.vue'
import ConfigProviderDemo from '../demo/config-provider.vue'

const demos = { Basic, Simple, Customize, Description, ConfigProviderDemo }

describe('Empty demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component, { global: { stubs: { Wave: true } } })
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
