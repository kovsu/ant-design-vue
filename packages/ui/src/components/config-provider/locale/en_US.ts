import type { Locale } from '../types'

const enUS: Locale = {
  locale: 'en',

  global: {
    placeholder: 'Please select',
  },

  Pagination: {
    items_per_page: '/ page',
    jump_to: 'Go to',
    page: 'Page',
    prev_page: 'Previous Page',
    next_page: 'Next Page',
    prev_5: 'Previous 5 Pages',
    next_5: 'Next 5 Pages',
    prev_3: 'Previous 3 Pages',
    next_3: 'Next 3 Pages',
  },

  Modal: {
    okText: 'OK',
    cancelText: 'Cancel',
    justOkText: 'OK',
  },

  Popconfirm: {
    okText: 'OK',
    cancelText: 'Cancel',
  },

  Form: {
    defaultValidateMessages: {},
  },

  Table: {
    filterTitle: 'Filter menu',
    filterConfirm: 'OK',
    filterReset: 'Reset',
    filterEmptyText: 'No filters',
    emptyText: 'No data',
    selectAll: 'Select current page',
    selectInvert: 'Invert current page',
    selectNone: 'Clear all data',
    selectionAll: 'Select all data',
    sortTitle: 'Sort',
    expand: 'Expand row',
    collapse: 'Collapse row',
    triggerDesc: 'Click to sort descending',
    triggerAsc: 'Click to sort ascending',
    cancelSort: 'Click to cancel sorting',
  },

  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Search here',
    notFoundContent: 'Not Found',
    itemUnit: 'item',
    itemsUnit: 'items',
    remove: 'Remove',
    selectAll: 'Select All',
    selectCurrent: 'Select Current Page',
    selectInvert: 'Invert Current Page',
    removeAll: 'Remove All',
    removeCurrent: 'Remove Current Page',
  },

  Upload: {
    uploading: 'Uploading...',
    removeFile: 'Remove file',
    downloadFile: 'Download file',
    uploadError: 'Upload error',
    previewFile: 'Preview file',
  },

  Empty: {
    description: 'No data',
  },

  QRCode: {
    expired: 'QR code expired',
    refresh: 'Refresh',
    scanned: 'Scanned',
  },

  DatePicker: {},

  Calendar: {},
}

export default enUS
