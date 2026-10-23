<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const open = ref(false)
const links = [
  { to: '/', label: 'Home' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/packages', label: 'Packages' },
  { to: '/contact', label: 'Contact' },
]
function close() { open.value = false }
function onKey(e: KeyboardEvent) { if (e.key === 'Escape') close() }
watch(open, (v) => {
  document.body.style.overflow = v ? 'hidden' : ''
  if (v) window.addEventListener('keydown', onKey)
  else window.removeEventListener('keydown', onKey)
})
watch(() => route.path, close)
onUnmounted(() => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) })
</script>
<template>
  <header class="site-header">
    <div class="wrap header-inner">
      <RouterLink to="/" class="brand" aria-label="Karan Kreation — home" @click="close">
        <span class="brand-mark" aria-hidden="true">K</span>
        <span class="brand-text">KARAN <strong>KREATION</strong><small>PHOTOGRAPHY · CINEMA · STORIES</small></span>
      </RouterLink>
      <button class="menu-btn" type="button" :aria-expanded="open" aria-controls="primary-nav" aria-label="Toggle navigation menu" @click="open = !open">
        <span :class="{ open }"></span><span :class="{ open }"></span>
      </button>
      <nav id="primary-nav" class="nav" :class="{ open }" aria-label="Primary">
        <RouterLink v-for="l in links" :key="l.to" :to="l.to" class="nav-link" :class="{ active: route.path === l.to }" @click="close">{{ l.label }}</RouterLink>
        <a class="nav-mail" href="mailto:Karankang190@gmail.com">Karankang190@gmail.com</a>
      </nav>
    </div>
  </header>
</template>
<style scoped lang="scss">
.site-header {
  position: fixed; inset: 0 0 auto 0; z-index: 100; height: var(--header-h);
  background: rgba(14,13,11,.82); backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--line-soft);
}
.header-inner { height: 100%; display: flex; align-items: center; justify-content: space-between; gap: 24px; }
.brand { display: inline-flex; align-items: center; gap: 13px; text-decoration: none; }
.brand-mark {
  width: 42px; height: 42px; display: grid; place-items: center; flex: none;
  border: 1px solid var(--line); font-family: var(--font-display); font-size: 1.3rem;
  color: var(--ink); position: relative;
  &::after { content:""; position:absolute; left:8px; right:8px; bottom:6px; height:2px; background: var(--accent); }
}
.brand-text { font-size: .92rem; letter-spacing: .16em; line-height: 1.25; strong { font-weight: 800; }
  small { display:block; font-size: .56rem; letter-spacing: .3em; color: var(--muted); font-weight: 600; } }
.nav { display: flex; align-items: center; gap: clamp(18px, 3vw, 38px); }
.nav-link {
  text-decoration: none; font-size: .9rem; font-weight: 600; letter-spacing: .06em;
  color: var(--ink-2); padding: 8px 2px; position: relative; transition: color .2s;
  &::after { content:""; position:absolute; left:0; bottom:2px; height:1px; width:0; background: var(--accent); transition: width .25s ease; }
  &:hover, &.active { color: #fff; }
  &:hover::after, &.active::after { width: 100%; }
}
.nav-mail { font-size: .83rem; color: var(--muted); text-decoration: none; border-left: 1px solid var(--line); padding-left: clamp(14px,2vw,26px); &:hover { color: var(--ink); } }
.menu-btn { display: none; background: none; border: 0; width: 44px; height: 44px; cursor: pointer; padding: 10px;
  span { display:block; height:2px; background: var(--ink); margin: 6px 0; transition: transform .3s ease, opacity .3s; }
  span.open:first-child { transform: translateY(4px) rotate(45deg); }
  span.open:last-child { transform: translateY(-4px) rotate(-45deg); }
}
@media (max-width: 860px) {
  .menu-btn { display: block; }
  .nav-mail { display: none; }
  .nav {
    position: fixed; inset: var(--header-h) 0 auto 0; flex-direction: column; align-items: stretch;
    background: #12100d; border-bottom: 1px solid var(--line); padding: 10px var(--gutter) 22px;
    transform: translateY(-12px); opacity: 0; pointer-events: none; transition: all .3s ease;
    &.open { transform: none; opacity: 1; pointer-events: auto; }
  }
  .nav-link { padding: 14px 4px; font-size: 1.05rem; border-bottom: 1px solid var(--line-soft); &::after{display:none;} }
}
</style>
