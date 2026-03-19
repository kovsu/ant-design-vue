import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Input from '../Input.vue'
import TextArea from '../TextArea.vue'
import Password from '../Password.vue'
import Search from '../Search.vue'

describe('Input', () => {
  describe('rendering', () => {
    it('renders a plain input by default', () => {
      const wrapper = mount(Input)
      expect(wrapper.find('input.ant-input').exists()).toBe(true)
    })

    it('has correct component name', () => {
      expect(Input.name).toBe('AInput')
    })

    it('renders with placeholder', () => {
      const wrapper = mount(Input, { props: { placeholder: 'Enter text' } })
      expect(wrapper.find('input').attributes('placeholder')).toBe('Enter text')
    })

    it('renders with id and name attributes', () => {
      const wrapper = mount(Input, { props: { id: 'my-input', name: 'field' } })
      expect(wrapper.find('input').attributes('id')).toBe('my-input')
      expect(wrapper.find('input').attributes('name')).toBe('field')
    })
  })

  describe('v-model:value', () => {
    it('displays the value prop', () => {
      const wrapper = mount(Input, { props: { value: 'hello' } })
      expect((wrapper.find('input').element as HTMLInputElement).value).toBe('hello')
    })

    it('emits update:value on input', async () => {
      const wrapper = mount(Input)
      await wrapper.find('input').setValue('test')
      expect(wrapper.emitted('update:value')).toBeTruthy()
      expect(wrapper.emitted('update:value')![0]).toEqual(['test'])
    })

    it('emits input event on input', async () => {
      const wrapper = mount(Input)
      await wrapper.find('input').trigger('input')
      expect(wrapper.emitted('input')).toBeTruthy()
    })

    it('emits change event', async () => {
      const wrapper = mount(Input)
      await wrapper.find('input').trigger('change')
      expect(wrapper.emitted('change')).toBeTruthy()
    })

    it('displays defaultValue when value is not provided', () => {
      const wrapper = mount(Input, { props: { defaultValue: 'default' } })
      expect((wrapper.find('input').element as HTMLInputElement).value).toBe('default')
    })

    it('converts number value to string', () => {
      const wrapper = mount(Input, { props: { value: 123 } })
      expect((wrapper.find('input').element as HTMLInputElement).value).toBe('123')
    })
  })

  describe('sizes', () => {
    it('applies small size class', () => {
      const wrapper = mount(Input, { props: { size: 'small' } })
      expect(wrapper.find('input').classes()).toContain('ant-input-sm')
    })

    it('applies large size class', () => {
      const wrapper = mount(Input, { props: { size: 'large' } })
      expect(wrapper.find('input').classes()).toContain('ant-input-lg')
    })

    it('has no size class for middle (default)', () => {
      const wrapper = mount(Input, { props: { size: 'middle' } })
      expect(wrapper.find('input').classes()).not.toContain('ant-input-sm')
      expect(wrapper.find('input').classes()).not.toContain('ant-input-lg')
    })
  })

  describe('disabled', () => {
    it('sets disabled attribute', () => {
      const wrapper = mount(Input, { props: { disabled: true } })
      expect(wrapper.find('input').attributes('disabled')).toBeDefined()
    })

    it('applies disabled class', () => {
      const wrapper = mount(Input, { props: { disabled: true } })
      expect(wrapper.find('input').classes()).toContain('ant-input-disabled')
    })
  })

  describe('readonly', () => {
    it('sets readonly attribute', () => {
      const wrapper = mount(Input, { props: { readonly: true } })
      expect(wrapper.find('input').attributes('readonly')).toBeDefined()
    })
  })

  describe('prefix and suffix', () => {
    it('renders prefix slot', () => {
      const wrapper = mount(Input, {
        slots: { prefix: '<span class="test-prefix">$</span>' },
      })
      expect(wrapper.find('.ant-input-affix-wrapper').exists()).toBe(true)
      expect(wrapper.find('.ant-input-prefix').exists()).toBe(true)
      expect(wrapper.find('.test-prefix').text()).toBe('$')
    })

    it('renders suffix slot', () => {
      const wrapper = mount(Input, {
        slots: { suffix: '<span class="test-suffix">kg</span>' },
      })
      expect(wrapper.find('.ant-input-affix-wrapper').exists()).toBe(true)
      expect(wrapper.find('.ant-input-suffix').exists()).toBe(true)
      expect(wrapper.find('.test-suffix').text()).toBe('kg')
    })

    it('applies wrapper size classes', () => {
      const wrapper = mount(Input, {
        props: { size: 'small' },
        slots: { prefix: '$' },
      })
      expect(wrapper.find('.ant-input-affix-wrapper-sm').exists()).toBe(true)
    })

    it('applies wrapper disabled class', () => {
      const wrapper = mount(Input, {
        props: { disabled: true },
        slots: { prefix: '$' },
      })
      expect(wrapper.find('.ant-input-affix-wrapper-disabled').exists()).toBe(true)
    })

    it('applies wrapper status class', () => {
      const wrapper = mount(Input, {
        props: { status: 'error' },
        slots: { prefix: '$' },
      })
      expect(wrapper.find('.ant-input-affix-wrapper-status-error').exists()).toBe(true)
    })
  })

  describe('addon', () => {
    it('renders addonBefore slot', () => {
      const wrapper = mount(Input, {
        slots: { addonBefore: 'https://' },
      })
      expect(wrapper.find('.ant-input-group-wrapper').exists()).toBe(true)
      expect(wrapper.find('.ant-input-group-addon').text()).toBe('https://')
    })

    it('renders addonAfter slot', () => {
      const wrapper = mount(Input, {
        slots: { addonAfter: '.com' },
      })
      expect(wrapper.find('.ant-input-group-wrapper').exists()).toBe(true)
      expect(wrapper.findAll('.ant-input-group-addon').at(-1)!.text()).toBe('.com')
    })

    it('renders both addons', () => {
      const wrapper = mount(Input, {
        slots: { addonBefore: 'http://', addonAfter: '.com' },
      })
      const addons = wrapper.findAll('.ant-input-group-addon')
      expect(addons).toHaveLength(2)
    })

    it('renders affix wrapper inside addon when prefix exists', () => {
      const wrapper = mount(Input, {
        slots: { addonBefore: 'http://', prefix: '@' },
      })
      expect(wrapper.find('.ant-input-group-wrapper').exists()).toBe(true)
      expect(wrapper.find('.ant-input-affix-wrapper').exists()).toBe(true)
      expect(wrapper.find('.ant-input-prefix').exists()).toBe(true)
    })
  })

  describe('allowClear', () => {
    it('shows clear icon when value is present', () => {
      const wrapper = mount(Input, {
        props: { allowClear: true, value: 'test' },
      })
      expect(wrapper.find('.ant-input-clear-icon').exists()).toBe(true)
    })

    it('hides clear icon when value is empty', () => {
      const wrapper = mount(Input, {
        props: { allowClear: true, value: '' },
      })
      expect(wrapper.find('.ant-input-clear-icon').exists()).toBe(false)
    })

    it('hides clear icon when disabled', () => {
      const wrapper = mount(Input, {
        props: { allowClear: true, value: 'test', disabled: true },
      })
      expect(wrapper.find('.ant-input-clear-icon').exists()).toBe(false)
    })

    it('clears value on click', async () => {
      const wrapper = mount(Input, {
        props: { allowClear: true, value: 'test' },
      })
      await wrapper.find('.ant-input-clear-icon').trigger('click')
      expect(wrapper.emitted('update:value')![0]).toEqual([''])
      expect(wrapper.emitted('clear')).toBeTruthy()
    })

    it('renders custom clear icon slot', () => {
      const wrapper = mount(Input, {
        props: { allowClear: true, value: 'test' },
        slots: { clearIcon: '<span class="custom-clear">X</span>' },
      })
      expect(wrapper.find('.custom-clear').exists()).toBe(true)
    })
  })

  describe('showCount', () => {
    it('shows character count', () => {
      const wrapper = mount(Input, {
        props: { showCount: true, value: 'hello' },
      })
      expect(wrapper.find('.ant-input-show-count-suffix').text()).toBe('5')
    })

    it('shows count with maxlength', () => {
      const wrapper = mount(Input, {
        props: { showCount: true, value: 'hi', maxlength: 10 },
      })
      expect(wrapper.find('.ant-input-show-count-suffix').text()).toBe('2 / 10')
    })
  })

  describe('status', () => {
    it('applies error status class', () => {
      const wrapper = mount(Input, { props: { status: 'error' } })
      expect(wrapper.find('input').classes()).toContain('ant-input-status-error')
    })

    it('applies warning status class', () => {
      const wrapper = mount(Input, { props: { status: 'warning' } })
      expect(wrapper.find('input').classes()).toContain('ant-input-status-warning')
    })
  })

  describe('borderless', () => {
    it('applies borderless class', () => {
      const wrapper = mount(Input, { props: { bordered: false } })
      expect(wrapper.find('input').classes()).toContain('ant-input-borderless')
    })
  })

  describe('events', () => {
    it('emits focus event', async () => {
      const wrapper = mount(Input)
      await wrapper.find('input').trigger('focus')
      expect(wrapper.emitted('focus')).toBeTruthy()
    })

    it('emits blur event', async () => {
      const wrapper = mount(Input)
      await wrapper.find('input').trigger('blur')
      expect(wrapper.emitted('blur')).toBeTruthy()
    })

    it('emits pressEnter on enter key', async () => {
      const wrapper = mount(Input)
      await wrapper.find('input').trigger('keydown', { key: 'Enter' })
      expect(wrapper.emitted('pressEnter')).toBeTruthy()
    })

    it('does not emit pressEnter on other keys', async () => {
      const wrapper = mount(Input)
      await wrapper.find('input').trigger('keydown', { key: 'a' })
      expect(wrapper.emitted('pressEnter')).toBeUndefined()
    })
  })

  describe('exposed methods', () => {
    it('exposes focus method', () => {
      const wrapper = mount(Input)
      expect(typeof wrapper.vm.focus).toBe('function')
    })

    it('exposes blur method', () => {
      const wrapper = mount(Input)
      expect(typeof wrapper.vm.blur).toBe('function')
    })

    it('exposes input ref', () => {
      const wrapper = mount(Input)
      expect(wrapper.vm.input).toBeDefined()
    })
  })

  describe('type prop', () => {
    it('defaults to text', () => {
      const wrapper = mount(Input)
      expect(wrapper.find('input').attributes('type')).toBe('text')
    })

    it('accepts custom type', () => {
      const wrapper = mount(Input, { props: { type: 'email' } })
      expect(wrapper.find('input').attributes('type')).toBe('email')
    })
  })

  describe('maxlength', () => {
    it('sets maxlength attribute', () => {
      const wrapper = mount(Input, { props: { maxlength: 10 } })
      expect(wrapper.find('input').attributes('maxlength')).toBe('10')
    })
  })
})

describe('TextArea', () => {
  describe('rendering', () => {
    it('renders a textarea element', () => {
      const wrapper = mount(TextArea)
      expect(wrapper.find('textarea.ant-input').exists()).toBe(true)
    })

    it('has correct component name', () => {
      expect(TextArea.name).toBe('ATextarea')
    })

    it('renders with placeholder', () => {
      const wrapper = mount(TextArea, { props: { placeholder: 'Enter text' } })
      expect(wrapper.find('textarea').attributes('placeholder')).toBe('Enter text')
    })

    it('renders with rows', () => {
      const wrapper = mount(TextArea, { props: { rows: 6 } })
      expect(wrapper.find('textarea').attributes('rows')).toBe('6')
    })
  })

  describe('v-model:value', () => {
    it('displays the value prop', () => {
      const wrapper = mount(TextArea, { props: { value: 'hello' } })
      expect((wrapper.find('textarea').element as HTMLTextAreaElement).value).toBe('hello')
    })

    it('emits update:value on input', async () => {
      const wrapper = mount(TextArea)
      await wrapper.find('textarea').setValue('test')
      expect(wrapper.emitted('update:value')).toBeTruthy()
      expect(wrapper.emitted('update:value')![0]).toEqual(['test'])
    })
  })

  describe('showCount', () => {
    it('shows character count', () => {
      const wrapper = mount(TextArea, {
        props: { showCount: true, value: 'hello' },
      })
      expect(wrapper.find('.ant-input-show-count-suffix').text()).toBe('5')
    })

    it('shows count with maxlength', () => {
      const wrapper = mount(TextArea, {
        props: { showCount: true, value: 'hi', maxlength: 100 },
      })
      expect(wrapper.find('.ant-input-show-count-suffix').text()).toBe('2 / 100')
    })

    it('applies show-count class to wrapper', () => {
      const wrapper = mount(TextArea, {
        props: { showCount: true },
      })
      expect(wrapper.find('.ant-input-textarea-show-count').exists()).toBe(true)
    })
  })

  describe('autoSize', () => {
    it('renders with autoSize=true', () => {
      const wrapper = mount(TextArea, {
        props: { autoSize: true },
      })
      expect(wrapper.find('textarea').exists()).toBe(true)
    })

    it('renders with autoSize object', () => {
      const wrapper = mount(TextArea, {
        props: { autoSize: { minRows: 2, maxRows: 6 } },
      })
      expect(wrapper.find('textarea').exists()).toBe(true)
    })
  })

  describe('disabled', () => {
    it('sets disabled attribute', () => {
      const wrapper = mount(TextArea, { props: { disabled: true } })
      expect(wrapper.find('textarea').attributes('disabled')).toBeDefined()
    })

    it('applies disabled class', () => {
      const wrapper = mount(TextArea, { props: { disabled: true } })
      expect(wrapper.find('textarea').classes()).toContain('ant-input-disabled')
    })
  })

  describe('events', () => {
    it('emits focus event', async () => {
      const wrapper = mount(TextArea)
      await wrapper.find('textarea').trigger('focus')
      expect(wrapper.emitted('focus')).toBeTruthy()
    })

    it('emits blur event', async () => {
      const wrapper = mount(TextArea)
      await wrapper.find('textarea').trigger('blur')
      expect(wrapper.emitted('blur')).toBeTruthy()
    })

    it('emits pressEnter on enter key', async () => {
      const wrapper = mount(TextArea)
      await wrapper.find('textarea').trigger('keydown', { key: 'Enter' })
      expect(wrapper.emitted('pressEnter')).toBeTruthy()
    })
  })

  describe('status', () => {
    it('applies error status class', () => {
      const wrapper = mount(TextArea, { props: { status: 'error' } })
      expect(wrapper.find('.ant-input-textarea-status-error').exists()).toBe(true)
    })

    it('applies warning status class', () => {
      const wrapper = mount(TextArea, { props: { status: 'warning' } })
      expect(wrapper.find('.ant-input-textarea-status-warning').exists()).toBe(true)
    })
  })

  describe('exposed methods', () => {
    it('exposes focus method', () => {
      const wrapper = mount(TextArea)
      expect(typeof wrapper.vm.focus).toBe('function')
    })

    it('exposes blur method', () => {
      const wrapper = mount(TextArea)
      expect(typeof wrapper.vm.blur).toBe('function')
    })
  })
})

describe('Password', () => {
  describe('rendering', () => {
    it('renders an input with type=password', () => {
      const wrapper = mount(Password)
      expect(wrapper.find('input').attributes('type')).toBe('password')
    })

    it('has correct component name', () => {
      expect(Password.name).toBe('AInputPassword')
    })

    it('renders inside .ant-input-password wrapper', () => {
      const wrapper = mount(Password)
      expect(wrapper.find('.ant-input-password').exists()).toBe(true)
    })
  })

  describe('visibility toggle', () => {
    it('shows toggle button by default', () => {
      const wrapper = mount(Password)
      expect(wrapper.find('.ant-input-password-icon').exists()).toBe(true)
    })

    it('hides toggle button when visibilityToggle=false', () => {
      const wrapper = mount(Password, { props: { visibilityToggle: false } })
      expect(wrapper.find('.ant-input-password-icon').exists()).toBe(false)
    })

    it('toggles input type via controlled visible prop', async () => {
      const TestWrapper = {
        template: `
          <Password :visible="visible" @update:visible="visible = $event" />
        `,
        components: { Password },
        data() {
          return { visible: false }
        },
      }
      const wrapper = mount(TestWrapper)
      expect(wrapper.find('input').attributes('type')).toBe('password')

      await wrapper.setData({ visible: true })
      expect(wrapper.find('input').attributes('type')).toBe('text')

      await wrapper.setData({ visible: false })
      expect(wrapper.find('input').attributes('type')).toBe('password')
    })

    it('emits update:visible on toggle', async () => {
      const wrapper = mount(Password)
      await wrapper.find('.ant-input-password-icon').trigger('click')
      expect(wrapper.emitted('update:visible')).toBeTruthy()
      expect(wrapper.emitted('update:visible')![0]).toEqual([true])
    })

    it('uses controlled visible prop', () => {
      const wrapper = mount(Password, { props: { visible: true } })
      expect(wrapper.find('input').attributes('type')).toBe('text')
    })

    it('shows hidden icon when password is hidden', () => {
      const wrapper = mount(Password)
      expect(wrapper.find('.ant-input-password-icon-hidden').exists()).toBe(true)
      expect(wrapper.find('.ant-input-password-icon-visible').exists()).toBe(false)
    })

    it('shows visible icon when password is shown', () => {
      const wrapper = mount(Password, { props: { visible: true } })
      expect(wrapper.find('.ant-input-password-icon-visible').exists()).toBe(true)
      expect(wrapper.find('.ant-input-password-icon-hidden').exists()).toBe(false)
    })
  })

  describe('v-model:value', () => {
    it('emits update:value on input', async () => {
      const wrapper = mount(Password)
      await wrapper.find('input').setValue('secret')
      expect(wrapper.emitted('update:value')).toBeTruthy()
      expect(wrapper.emitted('update:value')![0]).toEqual(['secret'])
    })
  })

  describe('events', () => {
    it('emits focus event', async () => {
      const wrapper = mount(Password)
      await wrapper.find('input').trigger('focus')
      expect(wrapper.emitted('focus')).toBeTruthy()
    })

    it('emits blur event', async () => {
      const wrapper = mount(Password)
      await wrapper.find('input').trigger('blur')
      expect(wrapper.emitted('blur')).toBeTruthy()
    })
  })
})

describe('Search', () => {
  describe('rendering', () => {
    it('renders an input inside search wrapper', () => {
      const wrapper = mount(Search)
      expect(wrapper.find('.ant-input-search').exists()).toBe(true)
      expect(wrapper.find('input').exists()).toBe(true)
    })

    it('has correct component name', () => {
      expect(Search.name).toBe('AInputSearch')
    })
  })

  describe('search event', () => {
    it('emits search on enter key', async () => {
      const wrapper = mount(Search, { props: { value: 'query' } })
      await wrapper.find('input').trigger('keydown', { key: 'Enter' })
      expect(wrapper.emitted('search')).toBeTruthy()
      expect(wrapper.emitted('search')![0][0]).toBe('query')
    })

    it('emits search on button click with enterButton', async () => {
      const wrapper = mount(Search, {
        props: { enterButton: true, value: 'query' },
      })
      await wrapper.find('.ant-input-search-button').trigger('click')
      expect(wrapper.emitted('search')).toBeTruthy()
      expect(wrapper.emitted('search')![0][0]).toBe('query')
    })

    it('emits search on icon click without enterButton', async () => {
      const wrapper = mount(Search, { props: { value: 'test' } })
      await wrapper.find('.ant-input-search-icon').trigger('click')
      expect(wrapper.emitted('search')).toBeTruthy()
      expect(wrapper.emitted('search')![0][0]).toBe('test')
    })

    it('does not emit search when disabled', async () => {
      const wrapper = mount(Search, {
        props: { enterButton: true, value: 'query', disabled: true },
      })
      await wrapper.find('.ant-input-search-button').trigger('click')
      expect(wrapper.emitted('search')).toBeUndefined()
    })
  })

  describe('enterButton', () => {
    it('renders search button when enterButton=true', () => {
      const wrapper = mount(Search, { props: { enterButton: true } })
      expect(wrapper.find('.ant-input-search-button').exists()).toBe(true)
    })

    it('renders custom button text', () => {
      const wrapper = mount(Search, { props: { enterButton: 'Go' } })
      expect(wrapper.find('.ant-input-search-button').text()).toBe('Go')
    })

    it('renders default "Search" text when enterButton=true', () => {
      const wrapper = mount(Search, { props: { enterButton: true } })
      expect(wrapper.find('.ant-input-search-button').text()).toBe('Search')
    })

    it('renders search icon when no enterButton', () => {
      const wrapper = mount(Search)
      expect(wrapper.find('.ant-input-search-icon').exists()).toBe(true)
      expect(wrapper.find('.ant-input-search-button').exists()).toBe(false)
    })

    it('applies with-button class', () => {
      const wrapper = mount(Search, { props: { enterButton: true } })
      expect(wrapper.find('.ant-input-search-with-button').exists()).toBe(true)
    })
  })

  describe('loading', () => {
    it('shows loading state on button', () => {
      const wrapper = mount(Search, {
        props: { enterButton: true, loading: true },
      })
      expect(wrapper.find('.ant-input-search-button-loading').exists()).toBe(true)
      expect(wrapper.find('.ant-input-search-loading').exists()).toBe(true)
    })

    it('shows loading state on icon', () => {
      const wrapper = mount(Search, { props: { loading: true } })
      expect(wrapper.find('.ant-input-search-icon-loading').exists()).toBe(true)
    })
  })

  describe('v-model:value', () => {
    it('emits update:value on input', async () => {
      const wrapper = mount(Search)
      await wrapper.find('input').setValue('search query')
      expect(wrapper.emitted('update:value')).toBeTruthy()
      expect(wrapper.emitted('update:value')![0]).toEqual(['search query'])
    })
  })
})
