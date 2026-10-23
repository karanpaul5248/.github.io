<script setup lang="ts">
import { site } from '@/data/site'
const year = new Date().getFullYear()
</script>
<template>
  <footer class="site-footer">
    <div class="wrap footer-grid">
      <div>
        <RouterLink to="/" class="f-brand">KARAN <strong>KREATION</strong></RouterLink>
        <p class="f-note">Photography and cinematic films, composed with intention.<br />{{ site.availability }}.</p>
      </div>
      <nav aria-label="Footer">
        <p class="f-head">Explore</p>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/gallery">Gallery</RouterLink>
        <RouterLink to="/packages">Packages</RouterLink>
        <RouterLink to="/contact">Contact</RouterLink>
      </nav>
      <div>
        <p class="f-head">Enquiries</p>
        <a :href="`mailto:${site.email}`">{{ site.email }}</a>
        <a :href="site.instagram" target="_blank" rel="noopener">Instagram — @karankreation</a>
        <RouterLink to="/contact">Start a project</RouterLink>
      </div>
    </div>
    <div class="wrap footer-base">
      <small>© {{ year }} Karan Kreation. All rights reserved.</small>
      <small>Prices shown in CAD.</small>
    </div>
  </footer>
</template>
<style scoped lang="scss">
.site-footer { border-top: 1px solid var(--line-soft); background: var(--bg-2); padding-top: clamp(48px, 6vw, 76px); margin-top: 0; }
.footer-grid { display: grid; grid-template-columns: 1.6fr 1fr 1fr; gap: 40px; padding-bottom: 48px; }
.f-brand { font-size: 1.05rem; letter-spacing: .16em; text-decoration: none; }
.f-note { color: var(--muted); margin-top: 16px; font-size: .94rem; }
.f-head { font-size: .7rem; letter-spacing: .28em; text-transform: uppercase; color: var(--muted); font-weight: 700; margin-bottom: 16px; }
nav, .footer-grid > div:last-child { display: flex; flex-direction: column; gap: 10px; a { color: var(--ink-2); text-decoration: none; font-size: .95rem; width: fit-content; &:hover { color:#fff; } } }
.footer-base { border-top: 1px solid var(--line-soft); padding-block: 22px; display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; color: var(--muted); }
@media (max-width: 760px) { .footer-grid { grid-template-columns: 1fr; gap: 32px; } }
</style>
