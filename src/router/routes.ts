import { RouteRecordRaw } from 'vue-router';
import authRoutes from './auth.routes';
import homeRoutes from './home.routes';

const routes: RouteRecordRaw[] = [
  ...homeRoutes,

  ...authRoutes,

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
