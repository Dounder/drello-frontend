import { RouteRecordRaw } from 'vue-router';

export const homeRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home-layout',
    component: () => import('src/home/layouts/HomeLayout.vue'),
    children: [
      {
        path: '',
        name: 'home-page',
        component: () => import('src/home/pages/HomePage.vue'),
      },
    ],
  },
];
