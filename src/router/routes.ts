import { RouteRecordRaw } from 'vue-router';
import authRoutes from './auth.routes';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home-layout',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home-page',
        component: () => import('pages/IndexPage.vue'),
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
