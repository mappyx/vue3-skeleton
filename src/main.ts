import { createApp } from 'vue'
import './assets/style.scss'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()

createApp(App).use(pinia).mount('#app')
