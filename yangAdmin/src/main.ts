import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router/index'
import AmuUI from '../amu-ui/es'

import 'element-plus/theme-chalk/dark/css-vars.css'
import './assets/css/index.css'
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import 'element-plus/theme-chalk/el-loading.css';
import 'element-plus/theme-chalk/el-message-box.css';
import 'element-plus/theme-chalk/el-message.css';

// 创建vue实例
const app = createApp(App)
console.log('test');

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
app.use(AmuUI);
app.use(store);
app.use(router);
// 挂载实例
app.mount('#app');
