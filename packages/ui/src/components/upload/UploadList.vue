<script setup lang="ts">
import { computed } from 'vue'
import PaperClipOutlined from '@ant-design/icons-vue/PaperClipOutlined'
import PictureTwoTone from '@ant-design/icons-vue/PictureTwoTone'
import FileTwoTone from '@ant-design/icons-vue/FileTwoTone'
import DeleteOutlined from '@ant-design/icons-vue/DeleteOutlined'
import DownloadOutlined from '@ant-design/icons-vue/DownloadOutlined'
import EyeOutlined from '@ant-design/icons-vue/EyeOutlined'
import LoadingOutlined from '@ant-design/icons-vue/LoadingOutlined'
import CloseOutlined from '@ant-design/icons-vue/CloseOutlined'
import type { UploadFile, UploadListType, ShowUploadListInterface } from './types'

defineOptions({ name: 'AUploadList' })

const props = withDefaults(
  defineProps<{
    items: UploadFile[]
    listType?: UploadListType
    showUploadList?: boolean | ShowUploadListInterface
    disabled?: boolean
  }>(),
  {
    listType: 'text',
    showUploadList: true,
    disabled: false,
  },
)

const emit = defineEmits<{
  (e: 'remove', file: UploadFile): void
  (e: 'preview', file: UploadFile): void
  (e: 'download', file: UploadFile): void
}>()

const showConfig = computed<ShowUploadListInterface>(() => {
  if (typeof props.showUploadList === 'boolean') {
    return {
      showRemoveIcon: props.showUploadList,
      showPreviewIcon: props.showUploadList,
      showDownloadIcon: false,
    }
  }
  return {
    showRemoveIcon: true,
    showPreviewIcon: true,
    showDownloadIcon: false,
    ...props.showUploadList,
  }
})

const listClasses = computed(() => ({
  'ant-upload-list': true,
  [`ant-upload-list-${props.listType}`]: true,
}))

function getItemClasses(file: UploadFile) {
  return {
    'ant-upload-list-item': true,
    [`ant-upload-list-item-${file.status || 'done'}`]: true,
  }
}

function getProgressWidth(file: UploadFile) {
  return { width: `${file.percent || 0}%` }
}

function handleRemove(file: UploadFile) {
  emit('remove', file)
}

function handlePreview(file: UploadFile) {
  emit('preview', file)
}

function handleDownload(file: UploadFile) {
  emit('download', file)
}

function isImageFile(file: UploadFile): boolean {
  if (file.thumbUrl) return true
  if (file.url) {
    const ext = file.url.split('.').pop()?.toLowerCase()
    return ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp', 'svg'].includes(ext || '')
  }
  if (file.type) {
    return file.type.startsWith('image/')
  }
  return false
}

function getThumbUrl(file: UploadFile): string {
  return file.thumbUrl || file.url || ''
}
</script>

<template>
  <div v-if="items.length > 0" :class="listClasses">
    <TransitionGroup name="ant-upload-list-item" tag="div">
      <!-- Text / Picture mode -->
      <template v-if="listType !== 'picture-card'">
        <div
          v-for="file in items"
          :key="file.uid"
          :class="getItemClasses(file)"
        >
          <slot name="itemRender" :file="file" :actions="{ remove: () => handleRemove(file), download: () => handleDownload(file), preview: () => handlePreview(file) }">
            <div class="ant-upload-list-item-info">
              <span class="ant-upload-list-item-icon">
                <slot name="iconRender" :file="file" :list-type="listType">
                  <LoadingOutlined v-if="file.status === 'uploading'" />
                  <template v-else-if="listType === 'picture'">
                    <img
                      v-if="isImageFile(file)"
                      :src="getThumbUrl(file)"
                      :alt="file.name"
                      class="ant-upload-list-item-thumbnail"
                    />
                    <FileTwoTone v-else />
                  </template>
                  <PaperClipOutlined v-else />
                </slot>
              </span>
              <span
                class="ant-upload-list-item-name"
                :title="file.name"
                @click="handlePreview(file)"
              >
                {{ file.name }}
              </span>
            </div>
            <span class="ant-upload-list-item-actions">
              <button
                v-if="showConfig.showDownloadIcon && file.status === 'done'"
                type="button"
                class="ant-upload-list-item-action"
                :title="'Download'"
                :disabled="disabled"
                @click="handleDownload(file)"
              >
                <slot name="downloadIcon" :file="file">
                  <DownloadOutlined />
                </slot>
              </button>
              <button
                v-if="showConfig.showRemoveIcon"
                type="button"
                class="ant-upload-list-item-action"
                :title="'Remove'"
                :disabled="disabled"
                @click="handleRemove(file)"
              >
                <slot name="removeIcon" :file="file">
                  <DeleteOutlined />
                </slot>
              </button>
            </span>
            <div v-if="file.status === 'uploading'" class="ant-upload-list-item-progress">
              <div class="ant-upload-list-item-progress-bar" :style="getProgressWidth(file)" />
            </div>
          </slot>
        </div>
      </template>

      <!-- Picture Card mode -->
      <template v-else>
        <div
          v-for="file in items"
          :key="file.uid"
          :class="getItemClasses(file)"
        >
          <slot name="itemRender" :file="file" :actions="{ remove: () => handleRemove(file), download: () => handleDownload(file), preview: () => handlePreview(file) }">
            <div class="ant-upload-list-item-container">
              <div class="ant-upload-list-item-thumbnail-wrapper">
                <template v-if="file.status === 'uploading'">
                  <div class="ant-upload-list-item-uploading">
                    <LoadingOutlined />
                    <span class="ant-upload-list-item-uploading-text">Uploading...</span>
                  </div>
                </template>
                <template v-else>
                  <img
                    v-if="isImageFile(file)"
                    :src="getThumbUrl(file)"
                    :alt="file.name"
                    class="ant-upload-list-item-card-image"
                  />
                  <FileTwoTone v-else class="ant-upload-list-item-card-file-icon" />
                </template>
              </div>
              <span class="ant-upload-list-item-card-actions">
                <button
                  v-if="showConfig.showPreviewIcon"
                  type="button"
                  class="ant-upload-list-item-action"
                  :title="'Preview'"
                  @click="handlePreview(file)"
                >
                  <slot name="previewIcon" :file="file">
                    <EyeOutlined />
                  </slot>
                </button>
                <button
                  v-if="showConfig.showDownloadIcon && file.status === 'done'"
                  type="button"
                  class="ant-upload-list-item-action"
                  :title="'Download'"
                  :disabled="disabled"
                  @click="handleDownload(file)"
                >
                  <slot name="downloadIcon" :file="file">
                    <DownloadOutlined />
                  </slot>
                </button>
                <button
                  v-if="showConfig.showRemoveIcon"
                  type="button"
                  class="ant-upload-list-item-action"
                  :title="'Remove'"
                  :disabled="disabled"
                  @click="handleRemove(file)"
                >
                  <slot name="removeIcon" :file="file">
                    <CloseOutlined />
                  </slot>
                </button>
              </span>
            </div>
            <div v-if="file.status === 'uploading'" class="ant-upload-list-item-progress">
              <div class="ant-upload-list-item-progress-bar" :style="getProgressWidth(file)" />
            </div>
          </slot>
        </div>
      </template>
    </TransitionGroup>
  </div>
</template>
