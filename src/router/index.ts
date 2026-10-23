import { createRouter, createWebHashHistory } from 'vue-router'

/**
 * Hash history is deliberate: GitHub Pages is a static host with no SPA
 * fallback, so history-mode routes like /gallery would 404 on refresh.
 * Hash routes (/#/gallery) always load index.html and never 404.
 */
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: () => import('@/pages/HomePage.vue') },
    { path: '/gallery', name: 'gallery', component: () => import('@/pages/GalleryPage.vue') },
    { path: '/packages', name: 'packages', component: () => import('@/pages/PackagesPage.vue') },
    { path: '/contact', name: 'contact', component: () => import('@/pages/ContactPage.vue') },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
