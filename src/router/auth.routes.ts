import { RouteRecordRaw } from 'vue-router';

const authRoutes: RouteRecordRaw[] = [
  {
    path: '/auth',
    name: 'auth-layout',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '', name: 'auth', redirect: { name: 'login' } },
      {
        path: 'login',
        name: 'login',
        component: () => import('src/auth/pages/LoginPage.vue'),
      },
      {
        path: 'forgot_password',
        name: 'forgot-password',
        component: () => import('src/auth/pages/ForgotPasswordPage.vue'),
      },
    ],
  },
];

export default authRoutes;
