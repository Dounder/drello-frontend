import useAuth from 'src/auth/composables/useAuth';
import { RouteRecordRaw } from 'vue-router';

const authRoutes: RouteRecordRaw[] = [
  {
    path: '/auth',
    name: 'auth-layout',
    component: () => import('layouts/AuthLayout.vue'),
    beforeEnter: (_, __, next) => (useAuth().isAuthenticated.value ? next({ name: 'home-page' }) : next()),
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
