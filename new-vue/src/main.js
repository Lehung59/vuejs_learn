import './main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { Layout, Menu, Table , Button, Tag, Divider, Col, Row, Form, Input, Image, Modal, Upload, Avatar, Comment, Select} from 'ant-design-vue';
import router from './router'

const app = createApp(App)

app.use(router)
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
