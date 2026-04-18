import { adminUI, applyTheme } from '@blog/shared'
import { getNativeStorage } from '@blog/shared/utils/storage/core'
import { defineStore } from 'pinia'

interface UIState {
  isCollapse: boolean
  isDark: boolean
}

// https://pinia.vuejs.org/zh/core-concepts/
export const useUIState = defineStore(adminUI, {
  state: (): UIState => ({
    isCollapse: false,
    isDark: window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false,
  }),
  // https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/config.html

  persist: {
    key: adminUI,
    storage: getNativeStorage('local'),
    pick: ['isDark'],
  },
  actions: {
    setCollapse(val: boolean) {
      this.isCollapse = val
    },

    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },

    setTheme(val: boolean) {
      this.isDark = val
      applyTheme(this.isDark)
    },
    toggleTheme() {
      this.setTheme(!this.isDark)
    },
  },
})
