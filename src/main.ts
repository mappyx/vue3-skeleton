import { createApp } from 'vue';
import './assets/style.scss';
import { createPinia } from 'pinia';
import App from './App.vue';
import config from './config';
import ApiService from './services/api.service';
import TokenService from './services/token.service';
import router from './router';

const pinia = createPinia()

ApiService.init(config.APP_ROOT_API);
if (TokenService.getToken()) {
  ApiService.setHeader();
  ApiService.mountRequestInterceptor();
  ApiService.mount401Interceptor();
}
router.isReady().then(() => {
  createApp(App).use(router).use(pinia).mount('#app');
});