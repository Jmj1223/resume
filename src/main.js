import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import {createPinia}  from 'pinia'

// createApp(App).mount('#app')
const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(Antd)
app.use(router)
app.mount('#app')

