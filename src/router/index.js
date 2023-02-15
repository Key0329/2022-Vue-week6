import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'FrontLayout',
    component: () => import('../views/FrontLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/front/HomeView.vue'),
      },
      {
        path: 'product/:id',
        name: 'Product',
        component: () => import('../views/front/ProductView.vue'),
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import('../views/front/ProductsView.vue'),
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('../views/front/CartView.vue'),
      },
    ],
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/DashboardView.vue'),
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('../views/admin/LoginView.vue'),
      },
      {
        path: 'products/:id(\\d+)?',
        name: 'ProductsPage',
        component: () => import('../views/admin/ProductsView.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active',
});

export default router;
