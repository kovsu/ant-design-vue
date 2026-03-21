import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import Fallback from '../demo/fallback.vue'
import PreviewGroup from '../demo/preview-group.vue'
import NoPreview from '../demo/no-preview.vue'

const demos = { Basic, Fallback, PreviewGroup, NoPreview }

describe('Image demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
