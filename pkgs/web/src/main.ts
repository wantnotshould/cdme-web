import pinia from '@blog/shared/utils/pinia'
import { createApp } from 'vue'
import App from './App.vue'
import './assets/scss/style.scss'
import router from './router'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
