import './main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { Layout, Menu } from 'ant-design-vue';
import router from './router'

const app = createApp(App)

app.use(router)
app.use(Layout);
app.use(Menu);

app.mount('#app')
