import { useAuthStore } from 'src/auth/store/auth.store';
import { RouteRecordRaw } from 'vue-router';

export const boardsRoutes: RouteRecordRaw[] = [
  {
    path: '/boards',
    name: 'board-layout',
    component: () => import('src/boards/layouts/BoardLayout.vue'),
    beforeEnter: (_, __, next) => {
      const token = useAuthStore().isLoggedIn;

      token ? next() : next({ name: 'auth-page' });
    },
    children: [
      {
        path: '',
        name: 'boards-page',
        component: () => import('src/boards/pages/BoardPage.vue'),
      },
    ],
  },
];
