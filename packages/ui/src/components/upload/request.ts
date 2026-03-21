import type { UploadRequestOption } from './types'

/**
 * Default upload implementation using XMLHttpRequest.
 * SSR-safe: only creates XMLHttpRequest when called (at runtime, never at module top-level).
 */
export function defaultRequest(options: UploadRequestOption): { abort: () => void } {
  const xhr = new XMLHttpRequest()

  if (options.onProgress && xhr.upload) {
    xhr.upload.addEventListener('progress', (e) => {
      if (e.total > 0) {
        const percent = Math.round((e.loaded / e.total) * 100)
        options.onProgress({ percent })
      }
    })
  }

  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      let response: any
      try {
        response = JSON.parse(xhr.responseText)
      } catch {
        response = xhr.responseText
      }
      options.onSuccess(response, xhr)
    } else {
      options.onError(new Error(`Upload failed with status ${xhr.status}`))
    }
  })

  xhr.addEventListener('error', () => {
    options.onError(new Error('Upload request failed'))
  })

  xhr.addEventListener('abort', () => {
    options.onError(new Error('Upload aborted'))
  })

  const formData = new FormData()
  formData.append(options.filename, options.file)

  if (options.data) {
    Object.entries(options.data).forEach(([key, value]) => {
      formData.append(key, value as string)
    })
  }

  xhr.open(options.method, options.action, true)

  if (options.withCredentials) {
    xhr.withCredentials = true
  }

  if (options.headers) {
    Object.entries(options.headers).forEach(([key, value]) => {
      xhr.setRequestHeader(key, value)
    })
  }

  xhr.send(formData)

  return {
    abort: () => xhr.abort(),
  }
}
