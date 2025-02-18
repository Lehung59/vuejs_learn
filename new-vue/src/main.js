import './main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { Layout, Menu, Table , Button, Tag, Divider, Col, Row, Form, Input, Image, Modal, Upload, Avatar, Comment, Select} from 'ant-design-vue';
import router from './router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'


const app = createApp(App)
const vuetify = createVuetify({
    components,
    directives,
})
app.use(vuetify)
app.use(router);
app.use(Layout);
app.use(Menu);
app.use(Table);
app.use(Button);
app.use(Tag);
app.use(Divider);
app.use(Col);
app.use(Row);
app.use(Form);
app.use(Input);
app.use(Image);
app.use(Modal);
app.use(Upload);
app.use(Avatar);
app.use(Comment);
app.use(Select);

app.mount('#app')
