import { useAuthStore } from 'src/auth/store/auth.store';
import { RouteRecordRaw } from 'vue-router';

export const homeRoutes: RouteRecordRaw[] = [
  { path: '', redirect: { name: 'home-page' } },
  {
    path: '/',
    name: 'home-layout',
    component: () => import('src/home/layout/HomeLayout.vue'),
    beforeEnter: (_, __, next) => {
      const token = useAuthStore().isLoggedIn;

      token ? next() : next({ name: 'auth-page' });
    },
    children: [
      {
        path: 'home',
        name: 'home-page',
        component: () => import('src/home/pages/HomePage.vue'),
      },
    ],
  },
];
