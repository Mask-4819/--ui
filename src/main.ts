import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App';
import router from './router';
import './assets/style/index.scss';
import '../packages/theme-style/lib/index.css';
import 'virtual:svg-icons-register';
import ui from '@--ui';

// console.log(button);
const app = createApp(App);
app.use(ui);
app.use(createPinia());
app.use(router);

app.mount('#app');
