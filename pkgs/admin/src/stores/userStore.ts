import { userProfile } from '@/api/handler/user'
import type { UserProfileResp } from '@/api/resp/user'
import { handlerError } from '@/utils/error'
import { getNativeStorage } from '@blog/shared/utils/storage/core'
import { defineStore } from 'pinia'

interface State {
  info: UserProfileResp | null
  loading: boolean
  lastFetched: number
}

const CACHE_TTL_MS = 10 * 60 * 1000

let inFlight: Promise<UserProfileResp | null> | null = null

export const useUserStore = defineStore('pinia-user', {
  state: (): State => ({
    info: null as UserProfileResp | null,
    loading: false,
    lastFetched: 0,
  }),

  // https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/config.html
  persist: {
    storage: getNativeStorage('local'),
    pick: ['info', 'lastFetched'],
  },
  getters: {
    isLoaded: state => state.info !== null,
    username: state => state.info?.username ?? '访客',
  },

  actions: {
    async fetchUserInfo(force = false, ttlMs = CACHE_TTL_MS): Promise<UserProfileResp | null> {
      if (!force) {
        const fresh = Date.now() - this.lastFetched < ttlMs
        if (this.info && fresh) return this.info
      }

      if (inFlight) return inFlight

      this.loading = true
      inFlight = (async (): Promise<UserProfileResp | null> => {
        try {
          const { data } = await userProfile()

          if (data.status) {
            this.info = data.data
            this.lastFetched = Date.now()
            return this.info
          } else {
            throw new Error(data.message)
          }
        } catch (err) {
          handlerError(err)
          return null
        } finally {
          this.loading = false
          inFlight = null
        }
      })()

      return inFlight
    },

    async refresh(): Promise<UserProfileResp | null> {
      return this.fetchUserInfo(true)
    },

    reset() {
      this.info = null
      this.lastFetched = 0
    },

    isExpired(ttl = CACHE_TTL_MS): boolean {
      return Date.now() - this.lastFetched > ttl
    },
  },
})
