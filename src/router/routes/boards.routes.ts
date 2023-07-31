import { RouteRecordRaw } from 'vue-router';

export const boardsRoutes: RouteRecordRaw[] = [
  {
    path: '/board',
    name: 'board-layout',
    component: () => import('src/boards/layouts/BoardLayout.vue'),
    redirect: { name: 'home-page' },
    children: [
      {
        path: ':title/:id',
        name: 'board-page',
        beforeEnter: (to, _, next) => {
          const { title, id } = to.params;

          if (!title || !id) {
            next({ name: 'home-page' });
            return;
          }

          next();
        },
        component: () => import('src/boards/pages/BoardPage.vue'),
      },
      { path: '/board/:pathMatch(.*)*', redirect: { name: 'home-page' } },
    ],
  },
];
