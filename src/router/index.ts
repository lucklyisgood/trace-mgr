import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import BasicLayout from '@/components/BasicLayout.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/DashboardView.vue')
      },
      {
        path: '/analysis',
        name: 'Analysis',
        component: () => import(/* webpackChunkName: "analysis" */ '../views/AnalysisView.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
