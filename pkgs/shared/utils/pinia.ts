import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { theme } from './theme'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
pinia.use(theme)

export default pinia
