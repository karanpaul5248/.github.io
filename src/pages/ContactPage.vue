<script setup lang="ts">
import { ref } from 'vue'
import SectionHeading from '@/components/SectionHeading.vue'
import ContactForm from '@/components/ContactForm.vue'
import { site } from '@/data/site'
import { useReveals, useSeo } from '@/composables'

useSeo('Contact — Karan Kreation', 'Enquire about wedding photography, cinematic films, music videos and commercial production with Karan Kreation, Canada.')
const root = ref<HTMLElement | null>(null)
useReveals(() => root.value)
</script>
<template>
  <div ref="root">
    <section class="section wrap page-top">
      <SectionHeading eyebrow="Contact" title="Tell me what <em>you're imagining.</em>"
        lede="Weddings, celebrations, music videos, travel films or something entirely your own — every project starts with a conversation. Share a few details and you will receive a personal reply." />
      <div class="contact-grid">
        <aside class="aside" data-reveal>
          <h2>The first step<br /><em>is a conversation.</em></h2>
          <p>Prefer email? Write directly — no form needed:</p>
          <a class="mail-big" :href="`mailto:${site.email}`">{{ site.email }}</a>
          <div class="aside-block"><span>Based in</span><p>{{ site.availability }}</p></div>
          <div class="aside-block"><span>Instagram</span><p><a href="https://www.instagram.com/karankreation" target="_blank" rel="noopener">@karankreation</a></p></div>
          <div class="aside-block"><span>Pricing</span><p>Packages from CAD $1,200 — see the <RouterLink to="/packages">Packages page</RouterLink> for confirmed pricing.</p></div>
        </aside>
        <div data-reveal>
          <ContactForm />
        </div>
      </div>
    </section>
  </div>
</template>
<style scoped lang="scss">
.page-top { padding-top: calc(var(--header-h) + clamp(40px, 6vw, 72px)); }
.contact-grid { display: grid; grid-template-columns: .85fr 1.3fr; gap: clamp(30px, 6vw, 84px); align-items: start; }
.aside { position: sticky; top: calc(var(--header-h) + 24px); display: flex; flex-direction: column; gap: 18px;
  h2 { font-size: clamp(1.8rem, 3.4vw, 2.6rem); }
  p { color: var(--ink-2); }
  a { color: var(--ink); }
}
.mail-big { font-family: var(--font-display); font-size: clamp(1.05rem, 2vw, 1.35rem); word-break: break-all; text-decoration: none; border-bottom: 1px solid var(--accent); padding-bottom: 4px; width: fit-content; }
.aside-block { border-top: 1px solid var(--line-soft); padding-top: 16px;
  span { font-size: .68rem; letter-spacing: .26em; text-transform: uppercase; color: var(--muted); font-weight: 700; display: block; margin-bottom: 6px; } }
@media (max-width: 860px) { .contact-grid { grid-template-columns: 1fr; } .aside { position: static; } }
</style>
