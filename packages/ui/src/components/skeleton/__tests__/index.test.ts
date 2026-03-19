import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Skeleton from '../Skeleton.vue'
import SkeletonButton from '../SkeletonButton.vue'
import SkeletonInput from '../SkeletonInput.vue'
import SkeletonImage from '../SkeletonImage.vue'
import SkeletonAvatar from '../SkeletonAvatar.vue'

describe('Skeleton', () => {
  it('renders default skeleton with title and 3 paragraph rows', () => {
    const wrapper = mount(Skeleton)
    expect(wrapper.find('.ant-skeleton').exists()).toBe(true)
    expect(wrapper.find('.ant-skeleton-title').exists()).toBe(true)
    expect(wrapper.findAll('.ant-skeleton-paragraph li')).toHaveLength(3)
  })

  it('adds active class when active=true', () => {
    const wrapper = mount(Skeleton, {
      props: { active: true },
    })
    expect(wrapper.find('.ant-skeleton').classes()).toContain('ant-skeleton-active')
  })

  it('does not add active class by default', () => {
    const wrapper = mount(Skeleton)
    expect(wrapper.find('.ant-skeleton').classes()).not.toContain('ant-skeleton-active')
  })

  it('renders avatar placeholder when avatar=true', () => {
    const wrapper = mount(Skeleton, {
      props: { avatar: true },
    })
    expect(wrapper.find('.ant-skeleton-header').exists()).toBe(true)
    expect(wrapper.find('.ant-skeleton-avatar').exists()).toBe(true)
    expect(wrapper.find('.ant-skeleton').classes()).toContain('ant-skeleton-with-avatar')
  })

  it('does not render avatar by default', () => {
    const wrapper = mount(Skeleton)
    expect(wrapper.find('.ant-skeleton-header').exists()).toBe(false)
    expect(wrapper.find('.ant-skeleton-avatar').exists()).toBe(false)
  })

  it('renders avatar with size classes', () => {
    const wrapperLg = mount(Skeleton, {
      props: { avatar: { size: 'large' } },
    })
    expect(wrapperLg.find('.ant-skeleton-avatar').classes()).toContain('ant-skeleton-avatar-lg')

    const wrapperSm = mount(Skeleton, {
      props: { avatar: { size: 'small' } },
    })
    expect(wrapperSm.find('.ant-skeleton-avatar').classes()).toContain('ant-skeleton-avatar-sm')
  })

  it('renders avatar with shape classes', () => {
    const wrapperCircle = mount(Skeleton, {
      props: { avatar: { shape: 'circle' } },
    })
    expect(wrapperCircle.find('.ant-skeleton-avatar').classes()).toContain('ant-skeleton-avatar-circle')

    const wrapperSquare = mount(Skeleton, {
      props: { avatar: { shape: 'square' } },
    })
    expect(wrapperSquare.find('.ant-skeleton-avatar').classes()).toContain('ant-skeleton-avatar-square')
  })

  it('renders avatar with custom numeric size', () => {
    const wrapper = mount(Skeleton, {
      props: { avatar: { size: 48 } },
    })
    const avatar = wrapper.find('.ant-skeleton-avatar')
    expect(avatar.attributes('style')).toContain('width: 48px')
    expect(avatar.attributes('style')).toContain('height: 48px')
  })

  it('renders 2 paragraph rows when avatar is present', () => {
    const wrapper = mount(Skeleton, {
      props: { avatar: true },
    })
    expect(wrapper.findAll('.ant-skeleton-paragraph li')).toHaveLength(2)
  })

  it('applies custom title width', () => {
    const wrapper = mount(Skeleton, {
      props: { title: { width: '50%' } },
    })
    expect(wrapper.find('.ant-skeleton-title').attributes('style')).toContain('width: 50%')
  })

  it('applies custom title width as number (px)', () => {
    const wrapper = mount(Skeleton, {
      props: { title: { width: 200 } },
    })
    expect(wrapper.find('.ant-skeleton-title').attributes('style')).toContain('width: 200px')
  })

  it('title defaults to 38% width when no paragraph', () => {
    const wrapper = mount(Skeleton, {
      props: { paragraph: false },
    })
    expect(wrapper.find('.ant-skeleton-title').attributes('style')).toContain('width: 38%')
  })

  it('hides title when title=false', () => {
    const wrapper = mount(Skeleton, {
      props: { title: false },
    })
    expect(wrapper.find('.ant-skeleton-title').exists()).toBe(false)
  })

  it('renders custom paragraph rows', () => {
    const wrapper = mount(Skeleton, {
      props: { paragraph: { rows: 5 } },
    })
    expect(wrapper.findAll('.ant-skeleton-paragraph li')).toHaveLength(5)
  })

  it('applies paragraph width as array', () => {
    const wrapper = mount(Skeleton, {
      props: { paragraph: { rows: 3, width: ['100%', '80%', '60%'] } },
    })
    const rows = wrapper.findAll('.ant-skeleton-paragraph li')
    expect(rows[0].attributes('style')).toContain('width: 100%')
    expect(rows[1].attributes('style')).toContain('width: 80%')
    expect(rows[2].attributes('style')).toContain('width: 60%')
  })

  it('applies paragraph width as single value to last row', () => {
    const wrapper = mount(Skeleton, {
      props: { paragraph: { rows: 3, width: '50%' } },
    })
    const rows = wrapper.findAll('.ant-skeleton-paragraph li')
    expect(rows[0].attributes('style')).toBeUndefined()
    expect(rows[1].attributes('style')).toBeUndefined()
    expect(rows[2].attributes('style')).toContain('width: 50%')
  })

  it('applies paragraph width as number (px) to last row', () => {
    const wrapper = mount(Skeleton, {
      props: { paragraph: { rows: 2, width: 300 } },
    })
    const rows = wrapper.findAll('.ant-skeleton-paragraph li')
    expect(rows[1].attributes('style')).toContain('width: 300px')
  })

  it('default last paragraph row width is 61%', () => {
    const wrapper = mount(Skeleton)
    const rows = wrapper.findAll('.ant-skeleton-paragraph li')
    const lastRow = rows[rows.length - 1]
    expect(lastRow.attributes('style')).toContain('width: 61%')
  })

  it('hides paragraph when paragraph=false', () => {
    const wrapper = mount(Skeleton, {
      props: { paragraph: false },
    })
    expect(wrapper.find('.ant-skeleton-paragraph').exists()).toBe(false)
  })

  it('shows children slot when loading=false', () => {
    const wrapper = mount(Skeleton, {
      props: { loading: false },
      slots: {
        default: '<div class="content">Loaded content</div>',
      },
    })
    expect(wrapper.find('.ant-skeleton').exists()).toBe(false)
    expect(wrapper.find('.content').text()).toBe('Loaded content')
  })

  it('shows skeleton when loading=true (default)', () => {
    const wrapper = mount(Skeleton, {
      slots: {
        default: '<div class="content">Loaded content</div>',
      },
    })
    expect(wrapper.find('.ant-skeleton').exists()).toBe(true)
    expect(wrapper.find('.content').exists()).toBe(false)
  })

  it('adds round class when round=true', () => {
    const wrapper = mount(Skeleton, {
      props: { round: true },
    })
    expect(wrapper.find('.ant-skeleton').classes()).toContain('ant-skeleton-round')
  })

  it('should render correctly', () => {
    const wrapper = mount(Skeleton)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render with avatar correctly', () => {
    const wrapper = mount(Skeleton, {
      props: { avatar: true, active: true },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('SkeletonButton', () => {
  it('renders skeleton button element', () => {
    const wrapper = mount(SkeletonButton)
    expect(wrapper.find('.ant-skeleton-element').exists()).toBe(true)
    expect(wrapper.find('.ant-skeleton-button').exists()).toBe(true)
  })

  it('applies size classes', () => {
    const wrapperLg = mount(SkeletonButton, {
      props: { size: 'large' },
    })
    expect(wrapperLg.find('.ant-skeleton-button').classes()).toContain('ant-skeleton-button-lg')

    const wrapperSm = mount(SkeletonButton, {
      props: { size: 'small' },
    })
    expect(wrapperSm.find('.ant-skeleton-button').classes()).toContain('ant-skeleton-button-sm')
  })

  it('applies shape classes', () => {
    const wrapperCircle = mount(SkeletonButton, {
      props: { shape: 'circle' },
    })
    expect(wrapperCircle.find('.ant-skeleton-button').classes()).toContain('ant-skeleton-button-circle')

    const wrapperRound = mount(SkeletonButton, {
      props: { shape: 'round' },
    })
    expect(wrapperRound.find('.ant-skeleton-button').classes()).toContain('ant-skeleton-button-round')

    const wrapperSquare = mount(SkeletonButton, {
      props: { shape: 'square' },
    })
    expect(wrapperSquare.find('.ant-skeleton-button').classes()).toContain('ant-skeleton-button-square')
  })

  it('applies block class', () => {
    const wrapper = mount(SkeletonButton, {
      props: { block: true },
    })
    expect(wrapper.find('.ant-skeleton-button').classes()).toContain('ant-skeleton-button-block')
  })

  it('applies active class', () => {
    const wrapper = mount(SkeletonButton, {
      props: { active: true },
    })
    expect(wrapper.find('.ant-skeleton').classes()).toContain('ant-skeleton-active')
  })
})

describe('SkeletonInput', () => {
  it('renders skeleton input element', () => {
    const wrapper = mount(SkeletonInput)
    expect(wrapper.find('.ant-skeleton-element').exists()).toBe(true)
    expect(wrapper.find('.ant-skeleton-input').exists()).toBe(true)
  })

  it('applies size classes', () => {
    const wrapperLg = mount(SkeletonInput, {
      props: { size: 'large' },
    })
    expect(wrapperLg.find('.ant-skeleton-input').classes()).toContain('ant-skeleton-input-lg')

    const wrapperSm = mount(SkeletonInput, {
      props: { size: 'small' },
    })
    expect(wrapperSm.find('.ant-skeleton-input').classes()).toContain('ant-skeleton-input-sm')
  })

  it('applies block class', () => {
    const wrapper = mount(SkeletonInput, {
      props: { block: true },
    })
    expect(wrapper.find('.ant-skeleton-input').classes()).toContain('ant-skeleton-input-block')
  })

  it('applies active class', () => {
    const wrapper = mount(SkeletonInput, {
      props: { active: true },
    })
    expect(wrapper.find('.ant-skeleton').classes()).toContain('ant-skeleton-active')
  })
})

describe('SkeletonImage', () => {
  it('renders skeleton image element', () => {
    const wrapper = mount(SkeletonImage)
    expect(wrapper.find('.ant-skeleton-element').exists()).toBe(true)
    expect(wrapper.find('.ant-skeleton-image').exists()).toBe(true)
  })

  it('renders SVG placeholder', () => {
    const wrapper = mount(SkeletonImage)
    expect(wrapper.find('.ant-skeleton-image-svg').exists()).toBe(true)
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('applies active class', () => {
    const wrapper = mount(SkeletonImage, {
      props: { active: true },
    })
    expect(wrapper.find('.ant-skeleton').classes()).toContain('ant-skeleton-active')
  })
})

describe('SkeletonAvatar', () => {
  it('renders skeleton avatar element', () => {
    const wrapper = mount(SkeletonAvatar)
    expect(wrapper.find('.ant-skeleton-element').exists()).toBe(true)
    expect(wrapper.find('.ant-skeleton-avatar').exists()).toBe(true)
  })

  it('applies size classes', () => {
    const wrapperLg = mount(SkeletonAvatar, {
      props: { size: 'large' },
    })
    expect(wrapperLg.find('.ant-skeleton-avatar').classes()).toContain('ant-skeleton-avatar-lg')

    const wrapperSm = mount(SkeletonAvatar, {
      props: { size: 'small' },
    })
    expect(wrapperSm.find('.ant-skeleton-avatar').classes()).toContain('ant-skeleton-avatar-sm')
  })

  it('applies shape classes', () => {
    const wrapperCircle = mount(SkeletonAvatar, {
      props: { shape: 'circle' },
    })
    expect(wrapperCircle.find('.ant-skeleton-avatar').classes()).toContain('ant-skeleton-avatar-circle')

    const wrapperSquare = mount(SkeletonAvatar, {
      props: { shape: 'square' },
    })
    expect(wrapperSquare.find('.ant-skeleton-avatar').classes()).toContain('ant-skeleton-avatar-square')
  })

  it('applies custom numeric size style', () => {
    const wrapper = mount(SkeletonAvatar, {
      props: { size: 64 },
    })
    const avatar = wrapper.find('.ant-skeleton-avatar')
    expect(avatar.attributes('style')).toContain('width: 64px')
    expect(avatar.attributes('style')).toContain('height: 64px')
    expect(avatar.attributes('style')).toContain('line-height: 64px')
  })

  it('applies active class', () => {
    const wrapper = mount(SkeletonAvatar, {
      props: { active: true },
    })
    expect(wrapper.find('.ant-skeleton').classes()).toContain('ant-skeleton-active')
  })

  it('defaults to circle shape', () => {
    const wrapper = mount(SkeletonAvatar)
    expect(wrapper.find('.ant-skeleton-avatar').classes()).toContain('ant-skeleton-avatar-circle')
  })
})
