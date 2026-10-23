<script setup lang="ts">
import { ref, watch, onUnmounted, nextTick } from 'vue'
import type { GalleryItem } from '@/data/gallery'

const props = defineProps<{ items: GalleryItem[]; index: number | null }>()
const emit = defineEmits<{ close: []; navigate: [index: number] }>()

const dialogRef = ref<HTMLElement | null>(null)
let lastFocused: Element | null = null

function close() { emit('close') }
function prev() { if (props.index !== null) emit('navigate', (props.index - 1 + props.items.length) % props.items.length) }
function next() { if (props.index !== null) emit('navigate', (props.index + 1) % props.items.length) }

function onKey(e: KeyboardEvent) {
  if (props.index === null) return
  if (e.key === 'Escape') close()
  if (e.key === 'ArrowLeft') prev()
  if (e.key === 'ArrowRight') next()
}

watch(() => props.index, async (v) => {
  if (v !== null) {
    lastFocused = document.activeElement
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    await nextTick()
    dialogRef.value?.querySelector<HTMLButtonElement>('.lb-close')?.focus()
  } else {
    document.body.style.overflow = ''
    window.removeEventListener('keydown', onKey)
    if (lastFocused instanceof HTMLElement) lastFocused.focus()
  }
})
onUnmounted(() => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) })
</script>
<template>
  <Teleport to="body">
    <div v-if="index !== null && items[index]" ref="dialogRef" class="lightbox" role="dialog" aria-modal="true" :aria-label="`Image viewer: ${items[index].title}`" @click.self="close">
      <button class="lb-close" type="button" aria-label="Close image viewer" @click="close">×</button>
      <button class="lb-nav lb-prev" type="button" aria-label="Previous image" @click="prev">‹</button>
      <figure class="lb-figure">
        <img :src="items[index].src" :alt="items[index].alt" />
        <figcaption>
          <span class="lb-title">{{ items[index].title }}</span>
          <span class="lb-meta">{{ items[index].category }} · {{ index + 1 }} / {{ items.length }}</span>
        </figcaption>
      </figure>
      <button class="lb-nav lb-next" type="button" aria-label="Next image" @click="next">›</button>
    </div>
  </Teleport>
</template>
<style scoped lang="scss">
.lightbox {
  position: fixed; inset: 0; z-index: 300; background: rgba(8,7,6,.96);
  display: flex; align-items: center; justify-content: center; padding: 70px 18px 26px;
  animation: fade-in .25s ease;
}
.lb-figure { margin: 0; max-width: min(1100px, 92vw); text-align: center;
  img { max-height: 74vh; width: auto; max-width: 100%; margin-inline: auto; object-fit: contain; border-radius: 2px; }
  figcaption { margin-top: 16px; display: flex; flex-direction: column; gap: 3px; }
}
.lb-title { font-family: var(--font-display); font-size: 1.25rem; }
.lb-meta { color: var(--muted); font-size: .82rem; letter-spacing: .14em; text-transform: uppercase; }
.lb-close, .lb-nav {
  position: absolute; background: rgba(255,255,255,.06); color: var(--ink);
  border: 1px solid var(--line); border-radius: 999px; cursor: pointer;
  width: 48px; height: 48px; font-size: 1.5rem; line-height: 1; display: grid; place-items: center;
  &:hover { background: var(--accent); border-color: var(--accent); }
}
.lb-close { top: 16px; right: 16px; }
.lb-prev { left: 14px; top: 50%; transform: translateY(-50%); }
.lb-next { right: 14px; top: 50%; transform: translateY(-50%); }
@media (max-width: 640px) {
  .lb-prev { left: 8px; } .lb-next { right: 8px; }
  .lb-nav { width: 42px; height: 42px; background: rgba(10,10,10,.55); }
}
</style>
