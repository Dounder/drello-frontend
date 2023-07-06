import { useAuthStore } from 'src/auth/store/auth.store';
import { RouteRecordRaw } from 'vue-router';

export const homeRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home-layout',
    component: () => import('src/home/layouts/HomeLayout.vue'),
    beforeEnter: (_, __, next) => {
      const token = useAuthStore().isLoggedIn;

      token ? next() : next({ name: 'auth-page' });
    },
    children: [
      {
        path: '',
        name: 'home-page',
        component: () => import('src/home/pages/HomePage.vue'),
      },
    ],
  },
];
