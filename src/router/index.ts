import { createRouter, createWebHashHistory } from 'vue-router'
import MainView from '../views/MainView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
    },
    {
      path: '/navigation',
      name: 'navigation',
      component: () => import('../views/navigation/TheNavigation.vue')
    },
    {
      path: '/bubble',
      name: 'bubble',
      component: () => import('../views/bubbles/index.vue')
    },
    {
      path: '/tick',
      name: 'tick',
      component: () => import('../views/tick/TheTick.vue')
    },
    {
      path: '/icon',
      name: 'icon',
      component: () => import('../views/icon/index.vue')
    },
    {
      path: '/card',
      name: 'card',
      component: () => import('@/views/card/index.vue')
    },
    {
      path: '/sudoku',
      name: 'sudoku',
      component: () => import('@/views/sudoku/TheSudoku.vue')
    },
    {
      path: '/paint',
      name: 'paint',
      component: () => import('@/views/paint/ThePaint.vue')
    },
    {
      path: '/frame',
      name: 'frame',
      component: () => import('@/views/frame/FrameView.vue')
    }
  ]
})

export default router
