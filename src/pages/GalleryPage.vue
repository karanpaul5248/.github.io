<script setup lang="ts">
import { ref, computed } from 'vue'
import SectionHeading from '@/components/SectionHeading.vue'
import GalleryGrid from '@/components/GalleryGrid.vue'
import { galleryItems, galleryCategories, type GalleryCategory } from '@/data/gallery'
import { useReveals, useSeo } from '@/composables'

useSeo('Gallery — Karan Kreation', 'Selected photography and filmmaking work by Karan Kreation: weddings, pre-wedding, portraits, events, music videos, travel and commercial.')
const root = ref<HTMLElement | null>(null)
useReveals(() => root.value)
const active = ref<'All' | GalleryCategory>('All')
const filtered = computed(() => active.value === 'All' ? galleryItems : galleryItems.filter(i => i.category === active.value))
</script>
<template>
  <div ref="root">
    <section class="section wrap page-top">
      <SectionHeading eyebrow="Gallery" title="Work, <em>by story.</em>"
        lede="Browse by category and open any frame to view it full-screen. Use the arrow keys in the viewer, and Escape to return." />
      <div class="filters" role="group" aria-label="Filter gallery by category">
        <button v-for="c in galleryCategories" :key="c" type="button" class="filter" :class="{ active: active === c }"
          :aria-pressed="active === c" @click="active = c">{{ c }}</button>
      </div>
      <p class="count" aria-live="polite">{{ filtered.length }} {{ filtered.length === 1 ? 'frame' : 'frames' }}<span v-if="active !== 'All'"> in {{ active }}</span></p>
      <GalleryGrid :items="filtered" />
      <div class="gallery-cta" data-reveal>
        <h2>Your story could <em>look like this.</em></h2>
        <RouterLink class="text-link" to="/contact">Start a project <span aria-hidden="true">↗</span></RouterLink>
      </div>
    </section>
  </div>
</template>
<style scoped lang="scss">
.page-top { padding-top: calc(var(--header-h) + clamp(40px, 6vw, 72px)); }
.filters { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 14px; }
.filter {
  background: transparent; border: 1px solid var(--line); color: var(--ink-2); border-radius: 999px;
  padding: 10px 18px; min-height: 44px; cursor: pointer; font-weight: 600; font-size: .9rem; transition: all .25s;
  &:hover { border-color: var(--ink-2); color: #fff; }
  &.active { background: var(--ink); color: #131109; border-color: var(--ink); }
}
.count { color: var(--muted); font-size: .88rem; margin-bottom: 22px; letter-spacing: .04em; }
.gallery-cta { margin-top: clamp(60px, 8vw, 100px); text-align: center; display: flex; flex-direction: column; align-items: center; gap: 18px;
  h2 { font-size: clamp(1.9rem, 4.4vw, 3rem); } .text-link { color: var(--ink); } }
</style>
