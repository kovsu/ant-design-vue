import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import Drag from '../demo/drag.vue'
import PictureCard from '../demo/picture-card.vue'
import FileList from '../demo/file-list.vue'
import MaxCount from '../demo/max-count.vue'

const demos = { Basic, Drag, PictureCard, FileList, MaxCount }

describe('Upload demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
