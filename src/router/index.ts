import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainView
    },
    {
      path: '/tailwind',
      name: 'tailwind',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/tailwind/TheTailwind.vue')
    },
    {
      path: '/clock',
      name: 'clock',
      component: () => import('../views/clock/TheClock.vue')
    },
    {
      path: '/ripple',
      name: 'ripple',
      component: () => import('../views/ripple/RippleCanvas2.vue')
    }
  ]
})

export default router
