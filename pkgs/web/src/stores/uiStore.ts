import { applyTheme, webUI } from '@blog/shared'
import { getNativeStorage } from '@blog/shared/utils/storage/core'
import { defineStore } from 'pinia'

interface UIState {
  isDark: boolean
}

// https://pinia.vuejs.org/zh/core-concepts/
export const useUIState = defineStore(webUI, {
  state: (): UIState => ({
    isDark: window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false,
  }),

  // https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/config.html
  persist: {
    key: webUI,
    storage: getNativeStorage('local'),
    pick: ['isDark'],
  },

  actions: {
    setTheme(val: boolean) {
      this.isDark = val
      applyTheme(this.isDark)
    },
    toggleTheme() {
      this.setTheme(!this.isDark)
    },
  },
})
