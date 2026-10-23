<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import { prefersReducedMotion } from '@/composables'

gsap.registerPlugin(ScrollTrigger)
const route = useRoute()
let lenis: Lenis | null = null
let rafId = 0

function raf(time: number) {
  lenis?.raf(time)
  rafId = requestAnimationFrame(raf)
}

onMounted(() => {
  if (prefersReducedMotion()) return
  lenis = new Lenis({ duration: 1.15, smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  rafId = requestAnimationFrame(raf)
})

watch(() => route.fullPath, () => {
  if (lenis) lenis.scrollTo(0, { immediate: true })
  requestAnimationFrame(() => ScrollTrigger.refresh())
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
  lenis?.destroy()
  lenis = null
})
</script>

<template>
  <a class="skip-link" href="#main">Skip to content</a>
  <SiteHeader />
  <main id="main" tabindex="-1">
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>
  </main>
  <SiteFooter />
</template>

<style lang="scss">
.page-enter-active, .page-leave-active { transition: opacity .38s ease, transform .38s ease; }
.page-enter-from { opacity: 0; transform: translateY(10px); }
.page-leave-to { opacity: 0; transform: translateY(-6px); }
@media (prefers-reduced-motion: reduce) {
  .page-enter-active, .page-leave-active { transition: none; }
  .page-enter-from, .page-leave-to { transform: none; }
}
</style>
