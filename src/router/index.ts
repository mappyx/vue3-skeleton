import { createRouter, createWebHistory } from 'vue-router';
import { RouteRecordRaw } from 'vue-router';
import App from '..App.vue';
import TokenService from '../services/token.service';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: App,
    children: [
      {
        path: '/',
        redirect: { name: 'dashboard.index'}
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to: any, from: any, next: any) => {
  const requiresAuth = to.matched.some((record: any) => record.meta.requiresAuth);
  const loggedIn = !!TokenService.getToken();

  if (requiresAuth && !loggedIn) {
    return next({ name: 'signin' });
  }

  if (!requiresAuth && loggedIn) {
    return next({ name: 'dashboard.index'});
  }

  next();
});

export default router