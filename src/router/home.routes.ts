import useAuth from 'src/auth/composables/useAuth';
import { RouteRecordRaw } from 'vue-router';

const homeRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home-layout',
    beforeEnter: (_, __, next) => (useAuth().isAuthenticated.value ? next() : next({ name: 'login' })),
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home-page', redirect: { name: 'projects-page' } },
      { path: 'projects', name: 'projects-page', component: () => import('src/home/pages/HomePage.vue') },
      { path: 'clients', name: 'clients-page', component: () => import('src/clients/pages/ClientsPage.vue') },
      { path: 'users', name: 'users-page', component: () => import('src/users/pages/UsersPage.vue') },
    ],
  },
];

export default homeRoutes;
