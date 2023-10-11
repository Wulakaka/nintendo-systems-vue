import { createRouter, createWebHashHistory } from 'vue-router'
import MainView from '../views/MainView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainView,
      redirect: '/swiper'
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
      path: '/navigation2',
      name: 'navigation2',
      component: () => import('../views/navigation2/index.vue')
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
      path: '/dialog',
      name: 'dialog',
      component: () => import('@/views/dialog/DialogView.vue')
    },
    {
      path: '/swiper',
      name: 'swiper',
      component: () => import('@/views/swiper/SwiperView.vue')
    },
    {
      path: '/d3',
      name: 'd3',
      component: () => import('@/views/d3/index.vue'),
      children: [
        {
          path: 'axis',
          name: 'D3Axis',
          component: () => import('@/views/d3/axis.vue')
        },
        {
          path: 'hierarchies',
          name: 'D3Hierarchies',
          component: () => import('@/views/d3/hierarchies.vue')
        }
      ]
    }
  ]
})

export default router
