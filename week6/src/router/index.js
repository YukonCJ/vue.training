import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: '首頁',
    component: () => import('../views/FrontView.vue'),
    children: [
      {
        path: '/home',
        name: '首頁',
        component: () => import('../views/HomeView.vue')
      },
      {
        path: '/about',
        name: '關於我',
        component: () => import('../views/AboutView.vue')
      },
      {
        path: '/products',
        name: '產品',
        component: () => import('../views/ProductsView.vue')
      }
    ]
  },
  {
    path: '/login',
    name: '管理員登入',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard/DashboardView.vue'),
    children: [
      {
        path: '/product',
        name: '產品管理',
        component: () => import('../views/Dashboard/ProductView.vue')
      },
      {
        path: '/order',
        name: '訂單管理',
        component: () => import('../views/Dashboard/OrderView.vue')
      }

    ]
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes
})

export default router
