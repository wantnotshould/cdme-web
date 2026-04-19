import { userRefreshToken } from '@/api/handler/user'
import router from '@/router'
import { useUserStore } from '@/stores/userStore'
import { getSignatureHeaders } from '@blog/shared'
import axios from 'axios'

const request = axios.create({
  timeout: 10000,
  withCredentials: true,
  // baseURL: import.meta.env.VITE_API_URL,
})

request.interceptors.request.use(config => {
  try {
    const sigHeaders = getSignatureHeaders(config)

    if (config.headers) {
      Object.entries(sigHeaders).forEach(([key, value]) => {
        config.headers.set(key, value)
      })
    }

    return config
  } catch (error) {
    return Promise.reject(error)
  }
})

let isRefreshing = false
let failedQueue: Array<(token: string) => void> = []

request.interceptors.response.use(
  response => response,
  async error => {
    const { response, config } = error
    const userStore = useUserStore()

    if (!response || response.status !== 401) {
      return Promise.reject(error)
    }

    if (config.url?.includes('/refresh-token')) {
      userStore.reset()
      router.replace({ name: 'login' })
      return Promise.reject(error)
    }

    if (isRefreshing) {
      return new Promise(resolve => {
        failedQueue.push((token: string) => {
          resolve(request(config))
        })
      })
    }

    isRefreshing = true

    try {
      const { data } = await userRefreshToken()

      if (!data.status) {
        throw new Error('refresh failed')
      }
      return request(config)
    } catch (err) {
      userStore.reset()
      router.replace({ name: 'login' })
      return Promise.reject(err)
    } finally {
      isRefreshing = false
    }
  }
)

export default request
