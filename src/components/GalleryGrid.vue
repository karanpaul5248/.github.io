<script setup lang="ts">
import { ref } from 'vue'
import type { GalleryItem } from '@/data/gallery'
import GalleryLightbox from './GalleryLightbox.vue'

defineProps<{ items: GalleryItem[] }>()
const lightboxIndex = ref<number | null>(null)
</script>
<template>
  <div>
    <div v-if="items.length" class="grid" role="list">
      <button v-for="(item, i) in items" :key="item.id" type="button" class="cell" :class="`r-${item.ratio}`" role="listitem"
        :aria-label="`View larger: ${item.title}`" @click="lightboxIndex = i">
        <img :src="item.src" :alt="item.alt" loading="lazy" decoding="async" />
        <span class="cell-meta"><span class="cell-title">{{ item.title }}</span><span class="cell-cat">{{ item.category }}</span></span>
      </button>
    </div>
    <p v-else class="empty">No work in this category yet.</p>
    <GalleryLightbox :items="items" :index="lightboxIndex" @close="lightboxIndex = null" @navigate="lightboxIndex = $event" />
  </div>
</template>
<style scoped lang="scss">
.grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: clamp(12px, 1.8vw, 22px); }
.cell {
  position: relative; overflow: hidden; border: 0; padding: 0; cursor: pointer; background: var(--bg-3);
  border-radius: 2px; grid-column: span 4; aspect-ratio: 4/3; text-align: left;
  &.r-tall { grid-row: span 2; aspect-ratio: auto; min-height: 100%; }
  &.r-wide { grid-column: span 8; }
  &.r-square { aspect-ratio: 1/1; }
  img { width: 100%; height: 100%; object-fit: cover; transition: transform .8s cubic-bezier(.2,.6,.2,1), filter .5s; }
  &:hover img, &:focus-visible img { transform: scale(1.045); }
  .cell-meta {
    position: absolute; inset: auto 0 0 0; padding: 38px 18px 15px; display: flex; flex-direction: column;
    background: linear-gradient(transparent, rgba(5,4,3,.82)); color: #fff;
    opacity: 0; transform: translateY(6px); transition: all .35s ease;
  }
  &:hover .cell-meta, &:focus-visible .cell-meta { opacity: 1; transform: none; }
  .cell-title { font-family: var(--font-display); font-size: 1.05rem; }
  .cell-cat { font-size: .68rem; letter-spacing: .24em; text-transform: uppercase; color: #d8cfbf; }
}
@media (hover: none) { .cell .cell-meta { opacity: 1; transform: none; } }
@media (max-width: 900px) { .cell { grid-column: span 6; &.r-wide { grid-column: span 12; } &.r-tall { min-height: 420px; } } }
@media (max-width: 560px) { .cell { grid-column: span 12; &.r-tall { min-height: 380px; } } }
.empty { color: var(--muted); padding: 30px 0; }
</style>
