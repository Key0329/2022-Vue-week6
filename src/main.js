import { createApp } from 'vue';
import { createPinia } from 'pinia';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { defineRule, Form, Field, ErrorMessage, configure } from 'vee-validate';
import AllRules from '@vee-validate/rules';
import { localize, loadLocaleFromURL } from '@vee-validate/i18n';

import { LoadingPlugin } from 'vue-loading-overlay';
import App from './App.vue';
import router from './router';
import 'vue-loading-overlay/dist/css/index.css';

import './assets/all.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

const app = createApp(App);

app.component('VForm', Form);
app.component('VField', Field);
app.component('ErrorMessage', ErrorMessage);

// defineRule('required', required);
// defineRule('email', email);
// defineRule('min', min);
// defineRule('max', max);

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

loadLocaleFromURL('./zh_TW.json');

configure({
  generateMessage: localize('zh_TW'),
  validateOnInput: true,
});

app.use(createPinia());
app.use(router);
app.use(VueAxios, axios);
app.use(LoadingPlugin);

app.mount('#app');
