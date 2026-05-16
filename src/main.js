import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/main.css' // <-- A LINHA QUE FALTAVA! O Tailwind entra por aqui.

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')