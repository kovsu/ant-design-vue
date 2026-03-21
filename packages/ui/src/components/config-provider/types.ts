import type { ComputedRef, InjectionKey, VNode } from 'vue'

export type SizeType = 'sm' | 'md' | 'lg'
export type DirectionType = 'ltr' | 'rtl'

// ---------------------------------------------------------------------------
// Locale
// ---------------------------------------------------------------------------
export interface PaginationLocale {
  items_per_page?: string
  jump_to?: string
  page?: string
  prev_page?: string
  next_page?: string
  prev_5?: string
  next_5?: string
  prev_3?: string
  next_3?: string
}

export interface ModalLocale {
  okText?: string
  cancelText?: string
  justOkText?: string
}

export interface PopconfirmLocale {
  okText?: string
  cancelText?: string
}

export interface FormLocale {
  defaultValidateMessages?: Record<string, any>
}

export interface TableLocale {
  filterTitle?: string
  filterConfirm?: string
  filterReset?: string
  filterEmptyText?: string
  emptyText?: string
  selectAll?: string
  selectInvert?: string
  selectNone?: string
  selectionAll?: string
  sortTitle?: string
  expand?: string
  collapse?: string
  triggerDesc?: string
  triggerAsc?: string
  cancelSort?: string
}

export interface TransferLocale {
  titles?: [string, string]
  searchPlaceholder?: string
  notFoundContent?: string
  itemUnit?: string
  itemsUnit?: string
  remove?: string
  selectAll?: string
  selectCurrent?: string
  selectInvert?: string
  removeAll?: string
  removeCurrent?: string
}

export interface UploadLocale {
  uploading?: string
  removeFile?: string
  downloadFile?: string
  uploadError?: string
  previewFile?: string
}

export interface EmptyLocale {
  description?: string
}

export interface QRCodeLocale {
  expired?: string
  refresh?: string
  scanned?: string
}

export interface DatePickerLocale {
  lang?: Record<string, any>
  timePickerLocale?: Record<string, any>
}

export interface CalendarLocale {
  lang?: Record<string, any>
}

export interface Locale {
  locale: string
  Pagination?: PaginationLocale
  Modal?: ModalLocale
  Popconfirm?: PopconfirmLocale
  Form?: FormLocale
  Table?: TableLocale
  Transfer?: TransferLocale
  Upload?: UploadLocale
  Empty?: EmptyLocale
  QRCode?: QRCodeLocale
  DatePicker?: DatePickerLocale
  Calendar?: CalendarLocale
  global?: {
    placeholder?: string
  }
}

// ---------------------------------------------------------------------------
// Component-specific config
// ---------------------------------------------------------------------------
export interface FormConfig {
  requiredMark?: boolean | 'optional'
  colon?: boolean
  validateMessages?: Record<string, any>
}

export interface WaveConfig {
  disabled?: boolean
}

export type RenderEmptyHandler = (componentName?: string) => VNode

// ---------------------------------------------------------------------------
// ConfigProvider Props
// ---------------------------------------------------------------------------
export interface ConfigProviderProps {
  /** Global component size */
  size?: SizeType
  /** Layout direction */
  direction?: DirectionType
  /** Globally disable all components */
  disabled?: boolean
  /** Return the container node for popup elements */
  getPopupContainer?: (triggerNode?: HTMLElement) => HTMLElement
  /** Locale configuration */
  locale?: Locale
  /** Form component configuration */
  form?: FormConfig
  /** Custom empty state renderer */
  renderEmpty?: RenderEmptyHandler
  /** Enable virtual scrolling for components that support it */
  virtual?: boolean
  /** Auto insert space in button with two Chinese characters */
  autoInsertSpaceInButton?: boolean
  /** Wave effect configuration */
  wave?: WaveConfig
}

export const configProviderDefaultProps = {
  size: 'md',
  direction: 'ltr',
  disabled: false,
} as const

// ---------------------------------------------------------------------------
// Config Provider Context (injection value)
// ---------------------------------------------------------------------------
export interface ConfigProviderContext {
  size: ComputedRef<SizeType>
  direction: ComputedRef<DirectionType>
  disabled: ComputedRef<boolean>
  getPopupContainer: ComputedRef<(triggerNode?: HTMLElement) => HTMLElement>
  locale: ComputedRef<Locale>
  form: ComputedRef<FormConfig | undefined>
  renderEmpty: ComputedRef<RenderEmptyHandler | undefined>
  virtual: ComputedRef<boolean | undefined>
  autoInsertSpaceInButton: ComputedRef<boolean | undefined>
  wave: ComputedRef<WaveConfig | undefined>
}

export const CONFIG_PROVIDER_KEY: InjectionKey<ConfigProviderContext> = Symbol('antdv-config')
