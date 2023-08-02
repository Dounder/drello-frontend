import { RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '../../auth/store/auth.store';

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '/auth',
    name: 'auth-layout',
    component: () => import('src/auth/layouts/AuthLayout.vue'),
    beforeEnter: (_, __, next) => {
      const token = useAuthStore().isLoggedIn;
      const user = useAuthStore().user;

      !token ? next() : next({ name: 'home-page', params: { username: user?.username } });
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
