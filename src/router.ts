import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/editor/:id',
      name: 'editor-with-id',
      component: () => import('./pages/editor/Editor.vue')
    },
    {
      path: '/editor',
      name: 'editor',
      component: () => import('./pages/editor/Editor.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./pages/home/Home.vue')
    },
    {
      path: '/playlist/:id',
      name: 'playlist',
      component: () => import('./pages/playlist/Playlist.vue')
    },
    {
      path: '/render/:id',
      name: 'render',
      component: () => import('./pages/render/Render.vue')
    },
    {
      path: '/',
      name: 'splash',
      component: () => import('./pages/splash/Splash.vue')
    },
  ]
})

export default router
