<script setup lang="ts">
import { ref } from 'vue'
import SectionHeading from '@/components/SectionHeading.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import { packages, additionalServices, formatCad } from '@/data/packages'
import { useReveals, useSeo } from '@/composables'

useSeo('Packages & Pricing in CAD — Karan Kreation',
  'Wedding photography CAD $1,200, videography CAD $1,800, photo + video CAD $2,800, complete wedding package with drone CAD $3,200, cinematic music video CAD $2,200.')
const root = ref<HTMLElement | null>(null)
useReveals(() => root.value)
const featured = packages.find(p => p.featured)!
const rest = packages.filter(p => !p.featured)
</script>
<template>
  <div ref="root">
    <section class="section wrap page-top">
      <SectionHeading eyebrow="Packages · Prices in CAD" title="Clear pricing, <em>no surprises.</em>"
        lede="Every package below is a confirmed starting point in Canadian dollars. Exact coverage details for your date are confirmed in a written quote before anything is booked — nothing is added later that was not agreed first." />

      <!-- Featured: Complete Wedding Package -->
      <article class="featured-pkg" data-reveal>
        <div class="fp-main">
          <p class="fp-tag">Complete Coverage</p>
          <h2>{{ featured.name }}</h2>
          <p class="fp-blurb">{{ featured.blurb }}</p>
          <ul><li v-for="pt in featured.points" :key="pt">{{ pt }}</li></ul>
        </div>
        <div class="fp-side">
          <p class="price">{{ formatCad(featured.price!) }} <small>{{ featured.priceNote }}</small></p>
          <PrimaryButton to="/contact">Enquire about this package</PrimaryButton>
          <p class="fp-note">Drone flights remain subject to applicable regulations, permissions, weather and site restrictions.</p>
        </div>
      </article>

      <div class="pkg-grid">
        <article v-for="p in rest" :key="p.id" class="pkg" data-reveal>
          <p class="pkg-index">{{ p.index }} — {{ p.priceNote }}</p>
          <h2>{{ p.name }}</h2>
          <p class="price">{{ formatCad(p.price!) }} <small v-if="p.id === 'music-video'">per music video</small></p>
          <p class="pkg-blurb">{{ p.blurb }}</p>
          <ul><li v-for="pt in p.points" :key="pt">{{ pt }}</li></ul>
          <RouterLink class="text-link" to="/contact">{{ p.cta }} <span aria-hidden="true">↗</span></RouterLink>
        </article>
      </div>

      <p class="fineprint" data-reveal>All prices are in Canadian dollars (CAD). Package details such as coverage hours, deliverables and timelines are confirmed for each project in a written quote — please use the Contact page to confirm the details for your date.</p>
    </section>

    <section class="section addl-band">
      <div class="wrap">
        <SectionHeading eyebrow="Also Available" title="Built around <em>your event.</em>"
          lede="These services are quoted individually, based on your date, location and coverage needs. No invented prices — ask, and you will receive a clear written quote." />
        <ul class="addl-list">
          <li v-for="s in additionalServices" :key="s" data-reveal>{{ s }}</li>
        </ul>
        <PrimaryButton to="/contact">Ask for a custom quote</PrimaryButton>
      </div>
    </section>
  </div>
</template>
<style scoped lang="scss">
.page-top { padding-top: calc(var(--header-h) + clamp(40px, 6vw, 72px)); }
.featured-pkg {
  display: grid; grid-template-columns: 1.5fr 1fr; gap: clamp(26px, 5vw, 64px);
  border: 1px solid rgba(163,38,56,.5); background: linear-gradient(160deg, rgba(163,38,56,.12), rgba(255,255,255,.015) 55%);
  padding: clamp(26px, 4.5vw, 52px); border-radius: var(--radius); margin-bottom: clamp(18px, 2.5vw, 26px);
  .fp-tag { font-size: .7rem; letter-spacing: .28em; text-transform: uppercase; color: #e5a3ad; font-weight: 700; }
  h2 { font-size: clamp(1.9rem, 3.6vw, 2.8rem); margin-top: 12px; }
  .fp-blurb { color: var(--ink-2); margin-top: 14px; max-width: 46ch; }
  ul { margin: 20px 0 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 9px;
    li { padding-left: 20px; position: relative; color: var(--ink-2); font-size: .96rem;
      &::before { content: ""; position: absolute; left: 0; top: .62em; width: 9px; height: 1px; background: var(--accent); } } }
  .fp-side { display: flex; flex-direction: column; gap: 18px; align-items: flex-start; justify-content: center; border-left: 1px solid var(--line-soft); padding-left: clamp(22px, 4vw, 52px); }
  .fp-note { color: var(--muted); font-size: .85rem; }
}
.price { font-family: var(--font-display); font-size: clamp(2rem, 3.6vw, 2.9rem); line-height: 1; small { font-size: .82rem; font-family: var(--font-body); color: var(--muted); letter-spacing: .08em; } }
.pkg-grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(16px, 2.5vw, 26px); }
.pkg { border: 1px solid var(--line-soft); background: var(--bg-2); border-radius: var(--radius); padding: clamp(24px, 3.6vw, 40px); display: flex; flex-direction: column; gap: 13px;
  .pkg-index { font-size: .7rem; letter-spacing: .26em; text-transform: uppercase; color: var(--muted); font-weight: 700; }
  h2 { font-size: clamp(1.5rem, 2.6vw, 2rem); }
  .pkg-blurb { color: var(--ink-2); font-size: .97rem; }
  ul { margin: 2px 0 8px; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 8px;
    li { padding-left: 20px; position: relative; color: var(--ink-2); font-size: .94rem;
      &::before { content: ""; position: absolute; left: 0; top: .62em; width: 9px; height: 1px; background: var(--accent); } } }
  .text-link { margin-top: auto; width: fit-content; color: var(--ink); }
}
.fineprint { color: var(--muted); font-size: .9rem; margin-top: 26px; max-width: 72ch; }
.addl-band { background: var(--bg-2); border-top: 1px solid var(--line-soft); }
.addl-list { list-style: none; margin: 0 0 34px; padding: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 0 clamp(20px, 4vw, 50px);
  li { padding: 15px 2px; border-bottom: 1px solid var(--line-soft); font-family: var(--font-display); font-size: 1.12rem; } }
@media (max-width: 860px) {
  .featured-pkg { grid-template-columns: 1fr; .fp-side { border-left: 0; border-top: 1px solid var(--line-soft); padding-left: 0; padding-top: 22px; } }
  .pkg-grid { grid-template-columns: 1fr; }
  .addl-list { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 520px) { .addl-list { grid-template-columns: 1fr; } }
</style>
