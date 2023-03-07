import useAuth from 'src/auth/composables/useAuth';
import { RouteRecordRaw } from 'vue-router';
import authRoutes from './auth.routes';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home-layout',
    beforeEnter: (_, __, next) => (useAuth().isAuthenticated.value ? next() : next({ name: 'login' })),
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home-page',
        component: () => import('src/home/pages/HomePage.vue'),
      },
    ],
  },

  ...authRoutes,

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
