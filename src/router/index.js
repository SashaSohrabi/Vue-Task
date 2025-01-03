import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/LoginPage.vue'), // Lazy-loaded
  },
  {
    path: '/user/:userId',
    name: 'UserDetails',
    component: () => import('@/views/UserDetailsPage.vue'), // Lazy-loaded
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
