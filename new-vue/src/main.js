import './main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { Layout, Menu, Table , Button, Tag, Divider} from 'ant-design-vue';
import router from './router'

const app = createApp(App)

app.use(router)
app.use(Layout);
app.use(Menu);
app.use(Table);
app.use(Button);
app.use(Tag);
app.use(Divider);

app.mount('#app')
