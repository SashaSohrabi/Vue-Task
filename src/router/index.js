import { createRouter, createWebHistory } from 'vue-router';

const isAuthenticated = () => {
  return !!localStorage.getItem('authToken');
};

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/LoginPage.vue'),
  },
  {
    path: '/user/:userId',
    name: 'UserDetails',
    component: () => import('@/views/UserDetailsPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*', // Catch-all route for 404
    name: 'NotFound',
    component: () => import('@/views/NotFoundPage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: 'Login' });
  } else if (!routes.some((route) => route.name === to.name)) {
    next({ name: 'NotFound' });
  } else {
    next();
  }
});

export default router;
