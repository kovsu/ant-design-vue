import { describe, expect, it, vi } from 'vitest'
import { Upload, UploadDragger } from '@ant-design-vue/ui'
import { mount } from '@vue/test-utils'
import type { UploadFile } from '../types'

describe('Upload', () => {
  it('should render correctly', () => {
    const wrapper = mount(Upload, {
      props: {
        action: 'https://httpbin.org/post',
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders upload trigger', () => {
    const wrapper = mount(Upload, {
      props: {
        action: 'https://httpbin.org/post',
      },
    })
    expect(wrapper.find('.ant-upload').exists()).toBe(true)
  })

  it('renders custom trigger via default slot', () => {
    const wrapper = mount(Upload, {
      props: {
        action: 'https://httpbin.org/post',
      },
      slots: {
        default: '<button class="custom-trigger">Upload</button>',
      },
    })
    expect(wrapper.find('.custom-trigger').exists()).toBe(true)
    expect(wrapper.find('.custom-trigger').text()).toBe('Upload')
  })

  it('renders file list', () => {
    const fileList: UploadFile[] = [
      { uid: '1', name: 'file1.txt', status: 'done' },
      { uid: '2', name: 'file2.txt', status: 'done' },
    ]
    const wrapper = mount(Upload, {
      props: {
        action: 'https://httpbin.org/post',
        fileList,
      },
    })
    expect(wrapper.findAll('.ant-upload-list-item')).toHaveLength(2)
  })

  it('renders file list with status indicators', () => {
    const fileList: UploadFile[] = [
      { uid: '1', name: 'done.txt', status: 'done' },
      { uid: '2', name: 'error.txt', status: 'error' },
      { uid: '3', name: 'uploading.txt', status: 'uploading', percent: 50 },
    ]
    const wrapper = mount(Upload, {
      props: {
        action: 'https://httpbin.org/post',
        fileList,
      },
    })
    expect(wrapper.find('.ant-upload-list-item-done').exists()).toBe(true)
    expect(wrapper.find('.ant-upload-list-item-error').exists()).toBe(true)
    expect(wrapper.find('.ant-upload-list-item-uploading').exists()).toBe(true)
  })

  it('shows progress bar for uploading files', () => {
    const fileList: UploadFile[] = [
      { uid: '1', name: 'uploading.txt', status: 'uploading', percent: 60 },
    ]
    const wrapper = mount(Upload, {
      props: {
        action: 'https://httpbin.org/post',
        fileList,
      },
    })
    const progressBar = wrapper.find('.ant-upload-list-item-progress-bar')
    expect(progressBar.exists()).toBe(true)
    expect(progressBar.attributes('style')).toContain('width: 60%')
  })

  it('removes file on remove button click', async () => {
    const fileList: UploadFile[] = [
      { uid: '1', name: 'file.txt', status: 'done' },
    ]
    const wrapper = mount(Upload, {
      props: {
        action: 'https://httpbin.org/post',
        fileList,
      },
    })

    // Find and click the remove button
    const removeBtn = wrapper.find('.ant-upload-list-item-action')
    await removeBtn.trigger('click')

    expect(wrapper.emitted('update:fileList')).toBeTruthy()
    expect(wrapper.emitted('change')).toBeTruthy()
  })

  it('emits preview event when file name is clicked', async () => {
    const fileList: UploadFile[] = [
      { uid: '1', name: 'file.txt', status: 'done' },
    ]
    const wrapper = mount(Upload, {
      props: {
        action: 'https://httpbin.org/post',
        fileList,
      },
    })

    await wrapper.find('.ant-upload-list-item-name').trigger('click')
    expect(wrapper.emitted('preview')).toBeTruthy()
  })

  it('renders drag zone when drag is true', () => {
    const wrapper = mount(Upload, {
      props: {
        action: 'https://httpbin.org/post',
        drag: true,
      },
    })
    expect(wrapper.find('.ant-upload-drag').exists()).toBe(true)
  })

  it('handles drag events', async () => {
    const wrapper = mount(Upload, {
      props: {
        action: 'https://httpbin.org/post',
        drag: true,
      },
    })

    const dragZone = wrapper.find('.ant-upload-drag')

    await dragZone.trigger('dragover')
    expect(wrapper.find('.ant-upload-drag-hover').exists()).toBe(true)

    await dragZone.trigger('dragleave')
    expect(wrapper.find('.ant-upload-drag-hover').exists()).toBe(false)
  })

  it('emits drop event', async () => {
    const wrapper = mount(Upload, {
      props: {
        action: 'https://httpbin.org/post',
        drag: true,
      },
    })

    const dragZone = wrapper.find('.ant-upload-drag')
    const dropEvent = new Event('drop') as DragEvent
    Object.defineProperty(dropEvent, 'dataTransfer', {
      value: { files: [] },
    })
    Object.defineProperty(dropEvent, 'preventDefault', {
      value: vi.fn(),
    })
    await dragZone.element.dispatchEvent(dropEvent)

    expect(wrapper.emitted('drop')).toBeTruthy()
  })

  it('hides upload trigger when maxCount is reached', () => {
    const fileList: UploadFile[] = [
      { uid: '1', name: 'file1.txt', status: 'done' },
      { uid: '2', name: 'file2.txt', status: 'done' },
    ]
    const wrapper = mount(Upload, {
      props: {
        action: 'https://httpbin.org/post',
        fileList,
        maxCount: 2,
      },
    })
    expect(wrapper.find('.ant-upload').exists()).toBe(false)
  })

  it('shows upload trigger when fileList is below maxCount', () => {
    const fileList: UploadFile[] = [
      { uid: '1', name: 'file1.txt', status: 'done' },
    ]
    const wrapper = mount(Upload, {
      props: {
        action: 'https://httpbin.org/post',
        fileList,
        maxCount: 3,
      },
    })
    expect(wrapper.find('.ant-upload').exists()).toBe(true)
  })

  it('renders picture-card list type', () => {
    const fileList: UploadFile[] = [
      { uid: '1', name: 'image.png', status: 'done', url: 'https://example.com/image.png' },
    ]
    const wrapper = mount(Upload, {
      props: {
        action: 'https://httpbin.org/post',
        fileList,
        listType: 'picture-card',
      },
    })
    expect(wrapper.find('.ant-upload-list-picture-card').exists()).toBe(true)
    expect(wrapper.find('.ant-upload-picture-card').exists()).toBe(true)
  })

  it('hides file list when showUploadList is false', () => {
    const fileList: UploadFile[] = [
      { uid: '1', name: 'file.txt', status: 'done' },
    ]
    const wrapper = mount(Upload, {
      props: {
        action: 'https://httpbin.org/post',
        fileList,
        showUploadList: false,
      },
    })
    expect(wrapper.find('.ant-upload-list').exists()).toBe(false)
  })

  it('applies disabled state', () => {
    const wrapper = mount(Upload, {
      props: {
        action: 'https://httpbin.org/post',
        disabled: true,
      },
    })
    expect(wrapper.find('.ant-upload-disabled').exists()).toBe(true)
  })

  it('calls beforeUpload before processing files', async () => {
    const beforeUpload = vi.fn(() => false)
    const wrapper = mount(Upload, {
      props: {
        action: 'https://httpbin.org/post',
        beforeUpload,
      },
    })

    // Simulate file selection
    const file = new File(['content'], 'test.txt', { type: 'text/plain' })
    const input = wrapper.find('.ant-upload-input')
    const inputEl = input.element as HTMLInputElement

    // Create a mock file list
    Object.defineProperty(inputEl, 'files', {
      value: [file],
      writable: false,
    })
    await input.trigger('change')

    expect(beforeUpload).toHaveBeenCalledWith(file, [file])
  })

  it('sets accept attribute on file input', () => {
    const wrapper = mount(Upload, {
      props: {
        action: 'https://httpbin.org/post',
        accept: 'image/*',
      },
    })
    const input = wrapper.find('.ant-upload-input')
    expect(input.attributes('accept')).toBe('image/*')
  })

  it('sets multiple attribute on file input', () => {
    const wrapper = mount(Upload, {
      props: {
        action: 'https://httpbin.org/post',
        multiple: true,
      },
    })
    const input = wrapper.find('.ant-upload-input')
    expect(input.attributes('multiple')).toBeDefined()
  })

  it('renders picture list type', () => {
    const fileList: UploadFile[] = [
      { uid: '1', name: 'image.png', status: 'done', thumbUrl: 'https://example.com/thumb.png' },
    ]
    const wrapper = mount(Upload, {
      props: {
        action: 'https://httpbin.org/post',
        fileList,
        listType: 'picture',
      },
    })
    expect(wrapper.find('.ant-upload-list-picture').exists()).toBe(true)
  })
})

describe('UploadDragger', () => {
  it('should render correctly', () => {
    const wrapper = mount(UploadDragger, {
      props: {
        action: 'https://httpbin.org/post',
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders as drag mode', () => {
    const wrapper = mount(UploadDragger, {
      props: {
        action: 'https://httpbin.org/post',
      },
    })
    expect(wrapper.find('.ant-upload-drag').exists()).toBe(true)
  })
})
