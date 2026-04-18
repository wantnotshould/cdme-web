import type { AxiosError } from 'axios'
import { ElMessage, ElNotification } from 'element-plus'

// Type guard: check if it's an AxiosError
function isAxiosError(err: any): err is AxiosError {
  return err?.isAxiosError === true
}

// Global error handler
export function handlerError(err: unknown): void {
  // Axios error
  if (isAxiosError(err)) {
    const status = err?.response?.status

    // 401 - Unauthorized
    if (status === 401) {
      ElNotification.error({
        title: 'Unauthorized',
        message: 'Request failed: Unauthorized (401). Please log in again.',
        duration: 0, // persist until manually closed
      })
      return
    }

    // 403 - Forbidden (silent)
    if (status === 403) {
      return
    }

    // Other HTTP errors
    const msg = err.message || 'Request failed'

    ElNotification.error({
      title: `Error ${status ?? ''}`.trim(),
      message: msg,
      duration: 5000,
    })

    return
  }

  // Native Error
  if (err instanceof Error) {
    if (/timeout/i.test(err.message)) {
      ElMessage.error('Request timeout. Please try again later.')
    } else {
      ElMessage.error(err.message || 'An unexpected error occurred.')
    }
    return
  }

  // Fallback
  ElMessage.error('An unknown error occurred.')
}

// Form validation error handler
export function handlerFormValidationError(
  err: Record<string, { message: string }[]> | unknown
): void {
  if (err && typeof err === 'object' && !Array.isArray(err)) {
    const errorObj = err as Record<string, { message: string }[]>

    for (const field in errorObj) {
      const messages = errorObj[field]
      if (Array.isArray(messages) && messages.length > 0) {
        const message = messages[0]?.message
        if (message) {
          ElMessage.error(message)
          return // show first error only
        }
      }
    }

    ElMessage.error('Form validation failed.')
    return
  }

  ElMessage.error('Form validation failed.')
}
