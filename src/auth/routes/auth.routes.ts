import { RouteRecordRaw } from 'vue-router';

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '/auth',
    name: 'auth-layout',
    component: () => import('src/auth/layouts/AuthLayout.vue'),
    children: [
      {
        path: '',
        name: 'auth-page',
        component: () => import('src/auth/pages/AuthPage.vue'),
      },
    ],
  },
];
