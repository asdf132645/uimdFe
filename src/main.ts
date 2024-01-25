// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/css/global.css';
import './assets/css/layout.css';
import { library } from '@fortawesome/fontawesome-svg-core';
// @ts-ignore
import { fas } from '@fortawesome/free-solid-svg-icons';
// @ts-ignore
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(fas);
const app = createApp(App);

// Vuex store 및 router 등록
app.use(router);
app.use(store);
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
