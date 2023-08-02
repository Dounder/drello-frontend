import { useAuthStore } from 'src/auth/store/auth.store';
import { RouteRecordRaw } from 'vue-router';
import { boardsRoutes } from './boards.routes';

export const homeRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home-layout',
    component: () => import('src/home/layout/HomeLayout.vue'),
    beforeEnter: (_, __, next) => {
      const token = useAuthStore().isLoggedIn;

      token ? next() : next({ name: 'auth-page' });
    },
    children: [
      { path: '', name: 'home-empty', redirect: { name: 'home-page' } },
      {
        path: ':username?/boards',
        name: 'home-page',
        beforeEnter: (to, _, next) => {
          const user = useAuthStore().user;

          if (user?.username === to.params.username) {
            next();
            return;
          }

          next({ name: 'home-page', params: { username: user?.username } });
        },
        component: () => import('src/home/pages/HomePage.vue'),
      },
      ...boardsRoutes,
    ],
  },
];
