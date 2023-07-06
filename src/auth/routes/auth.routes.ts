import { RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '../store/auth.store';

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '/auth',
    name: 'auth-layout',
    component: () => import('src/auth/layouts/AuthLayout.vue'),
    beforeEnter: (to, from, next) => {
      const token = useAuthStore().isLoggedIn;

      !token ? next() : next({ name: 'home-page' });
    },
    children: [
      {
        path: '',
        name: 'auth-page',
        component: () => import('src/auth/pages/AuthPage.vue'),
      },
    ],
  },
];
