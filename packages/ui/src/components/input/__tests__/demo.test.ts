import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import Size from '../demo/size.vue'
import Addon from '../demo/addon.vue'
import Textarea from '../demo/textarea.vue'
import PasswordDemo from '../demo/password.vue'
import SearchDemo from '../demo/search.vue'
import AllowClear from '../demo/allow-clear.vue'
import Status from '../demo/status.vue'
import ShowCount from '../demo/show-count.vue'

const demos = {
  Basic,
  Size,
  Addon,
  Textarea,
  PasswordDemo,
  SearchDemo,
  AllowClear,
  Status,
  ShowCount,
}

describe('Input demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
