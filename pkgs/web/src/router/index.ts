import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layout/Layout.vue'),
      children: [
        {
          path: '/',
          name: 'whoami',
          component: () => import('@/views/About.vue'),
        },
        {
          path: '404',
          name: 'not-found',
          component: () => import('@/views/pages/NotFound.vue'),
        },
        {
          // https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html
          path: ':pathMatch(.*)*',
          redirect: '/404',
        },
      ],
    },
  ],
})

export default router
