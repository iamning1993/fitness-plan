import { createApp } from 'vue'
import router from './router/index.js'
import App from './App.vue'
import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'
import './style.css'

createApp(App)
  .use(router)
  .use(ArcoVue)
  .mount('#app')
