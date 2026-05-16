import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/tracking',
      name: 'tracking',
      // Lazy-loading: carrega o componente apenas quando a rota é acedida
      component: () => import('../views/TrackingView.vue')
    },
    {
      path: '/lotes',
      name: 'lotes',
      component: () => import('../views/LotesView.vue')
    },
    {
      path: '/simulador',
      name: 'simulador',
      component: () => import('../views/SimuladorView.vue')
    }
  ]
})

export default router