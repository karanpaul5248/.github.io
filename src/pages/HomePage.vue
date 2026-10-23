<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import PrimaryButton from '@/components/PrimaryButton.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import { galleryItems } from '@/data/gallery'
import { useReveals, useSeo, prefersReducedMotion } from '@/composables'

useSeo('Karan Kreation — Photography & Cinematic Films',
  'Canada-based wedding photography and cinematic films, Anand Karaj and Punjabi wedding coverage, music videos and commercial production.')
const root = ref<HTMLElement | null>(null)
useReveals(() => root.value)
const featured = galleryItems.filter(i => i.featured).slice(0, 6)

const services = [
  { n: '01', name: 'Wedding Photography', note: 'Full-day stills, composed quietly and honestly.' },
  { n: '02', name: 'Wedding Cinematography', note: 'A film of the day as it actually felt.' },
  { n: '03', name: 'Photo + Film Together', note: 'One team, one story, told completely.' },
  { n: '04', name: 'Anand Karaj & Punjabi Weddings', note: 'Ceremony and celebration, covered with cultural fluency.' },
  { n: '05', name: 'Pre-Wedding & Celebrations', note: 'Shoots, birthdays, parties and private events.' },
  { n: '06', name: 'Music, Travel & Commercial', note: 'Music videos, travel films and promotional production.' },
]

onMounted(() => {
  if (prefersReducedMotion()) return
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  tl.fromTo('.hero-kicker', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .8 }, .15)
    .fromTo('.hero-line', { y: 56, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: .13 }, '-=.5')
    .fromTo('.hero-sub', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: .8 }, '-=.6')
    .fromTo('.hero-ctas', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: .7 }, '-=.55')
})
</script>
<template>
  <div ref="root">
    <!-- HERO — original photograph preserved from the previous site, optimised -->
    <section class="hero" aria-label="Introduction">
      <img class="hero-img" src="/assets/hero-original.jpg" alt="Cinematic landscape photograph by Karan Kreation" fetchpriority="high" />
      <div class="hero-shade" aria-hidden="true"></div>
      <div class="wrap hero-content">
        <p class="eyebrow hero-kicker">Karan Kreation · Canada · Available Worldwide</p>
        <h1 class="hero-title">
          <span class="hero-line">The feeling,</span>
          <span class="hero-line"><em>framed forever.</em></span>
        </h1>
        <p class="hero-sub">Photography and cinematic films for weddings, celebrations and creative productions — composed carefully, told honestly, and made to be returned to.</p>
        <div class="hero-ctas">
          <PrimaryButton to="/gallery">View the gallery</PrimaryButton>
          <PrimaryButton to="/contact" variant="ghost">Start a project</PrimaryButton>
        </div>
      </div>
      <div class="hero-foot wrap" aria-hidden="true">
        <span>Weddings · Films · Stories</span>
        <span class="scroll-cue"><span></span>Scroll</span>
      </div>
    </section>

    <!-- FEATURED WORK -->
    <section class="section wrap" aria-labelledby="featured-h">
      <SectionHeading eyebrow="Selected Work" title="Frames that <em>stay with you.</em>"
        lede="A curated selection across weddings, portraits, events and travel. The full collection — filterable by story — lives in the gallery.">
        <RouterLink class="text-link" to="/gallery">View full gallery <span aria-hidden="true">↗</span></RouterLink>
      </SectionHeading>
      <div class="featured-grid">
        <RouterLink v-for="(item, i) in featured" :key="item.id" to="/gallery" class="f-cell" :class="`f-${i}`" data-reveal :aria-label="`Open gallery — ${item.title}`">
          <img :src="item.src" :alt="item.alt" loading="lazy" decoding="async" />
          <span class="f-meta"><span>{{ item.title }}</span><small>{{ item.category }}</small></span>
        </RouterLink>
      </div>
    </section>

    <!-- INTRODUCTION -->
    <section class="section intro-band" aria-labelledby="intro-h">
      <div class="wrap intro-grid">
        <div data-reveal>
          <p class="eyebrow">The Practice</p>
          <h2 id="intro-h">Seen slowly.<br /><em>Made carefully.</em></h2>
        </div>
        <div class="intro-copy" data-reveal>
          <p>Karan Kreation is a photography and filmmaking practice built on a simple discipline: watch first, shoot second. The unposed glance, the pause before the vows, the light changing over a room — those are the frames a day is remembered by.</p>
          <p>Every project is approached personally, from the first conversation to the final edit: cinematic composition, attention to the small details, and coverage shaped around your event rather than a template. Based in Canada, and available for destination weddings and productions internationally.</p>
          <RouterLink class="text-link" to="/contact">Tell me about your project <span aria-hidden="true">↗</span></RouterLink>
        </div>
      </div>
    </section>

    <!-- SERVICES -->
    <section class="section wrap" aria-labelledby="services-h">
      <SectionHeading eyebrow="Services" title="One practice, <em>many stories.</em>" />
      <div class="service-rows">
        <RouterLink v-for="s in services" :key="s.n" to="/packages" class="s-row" data-reveal>
          <span class="s-n">{{ s.n }}</span>
          <span class="s-name">{{ s.name }}</span>
          <span class="s-note">{{ s.note }}</span>
          <span class="s-arrow" aria-hidden="true">↗</span>
        </RouterLink>
      </div>
    </section>

    <!-- REEL / FILM NOTE -->
    <section class="reel" aria-labelledby="reel-h">
      <img src="/assets/story-original.jpg" alt="Wide cinematic landscape, photographed by Karan Kreation" loading="lazy" decoding="async" />
      <div class="reel-shade" aria-hidden="true"></div>
      <div class="wrap reel-content" data-reveal>
        <p class="eyebrow">The Films</p>
        <h2 id="reel-h">Stillness is only<br /><em>half the story.</em></h2>
        <p>Wedding films and music videos are shared in full during consultation, so you can watch complete work — not a highlight cut — before you decide. Ask for film examples with your enquiry and they will be sent with your reply.</p>
        <!-- OWNER: to add a public showreel, paste a Vimeo/YouTube embed here.
             See INSTRUCTIONS_v5.txt section 12. No video URL is fabricated in this build. -->
        <PrimaryButton to="/contact" variant="ghost">Request film examples</PrimaryButton>
      </div>
    </section>

    <!-- CLOSING CTA -->
    <section class="section wrap closing" data-reveal>
      <p class="eyebrow">Begin</p>
      <h2>Have a day worth<br /><em>keeping properly?</em></h2>
      <p class="lede">Dates are confirmed in a written quote, with no obligation from a first conversation.</p>
      <PrimaryButton to="/contact">Discuss your project</PrimaryButton>
    </section>
  </div>
</template>
<style scoped lang="scss">
.hero { position: relative; min-height: 100svh; display: flex; flex-direction: column; justify-content: flex-end; overflow: hidden; }
.hero-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.hero-shade { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(10,9,7,.42) 0%, rgba(10,9,7,.18) 40%, rgba(10,9,7,.86) 100%); }
.hero-content { position: relative; padding-top: calc(var(--header-h) + 60px); padding-bottom: 30px; }
.hero-title { font-size: clamp(3rem, 9vw, 7.2rem); margin-top: 22px; .hero-line { display: block; } }
.hero-sub { margin-top: 26px; max-width: 52ch; color: #e3dac9; font-size: clamp(1rem, 1.6vw, 1.2rem); }
.hero-ctas { display: flex; gap: 14px; flex-wrap: wrap; margin-top: 34px; }
.hero-foot { position: relative; display: flex; justify-content: space-between; align-items: center; padding-bottom: 26px; color: #cfc5b3; font-size: .74rem; letter-spacing: .26em; text-transform: uppercase; }
.scroll-cue { display: inline-flex; align-items: center; gap: 10px; span { width: 1px; height: 34px; background: var(--ink); display: inline-block; animation: scroll-cue 2.2s ease-in-out infinite; } }

.featured-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: clamp(12px, 1.8vw, 22px); }
.f-cell { position: relative; overflow: hidden; border-radius: 2px; grid-column: span 4; aspect-ratio: 4/3; background: var(--bg-3);
  &.f-0 { grid-column: span 7; aspect-ratio: 16/10; } &.f-1 { grid-column: span 5; aspect-ratio: auto; }
  &.f-3 { grid-column: span 5; } &.f-4 { grid-column: span 7; aspect-ratio: 16/9; }
  img { width: 100%; height: 100%; object-fit: cover; transition: transform .8s cubic-bezier(.2,.6,.2,1); }
  &:hover img { transform: scale(1.04); }
  .f-meta { position: absolute; inset: auto 0 0 0; padding: 40px 18px 15px; display: flex; flex-direction: column; color: #fff; background: linear-gradient(transparent, rgba(5,4,3,.85));
    span { font-family: var(--font-display); font-size: 1.08rem; } small { letter-spacing: .22em; text-transform: uppercase; font-size: .66rem; color: #d8cfbf; } }
}
@media (max-width: 820px) { .f-cell, .f-cell.f-0, .f-cell.f-4 { grid-column: span 12; aspect-ratio: 4/3; } .f-cell.f-1 { grid-column: span 12; aspect-ratio: 4/3; } }

.intro-band { background: var(--bg-2); border-block: 1px solid var(--line-soft); }
.intro-grid { display: grid; grid-template-columns: 1fr 1.25fr; gap: clamp(28px, 6vw, 90px);
  h2 { font-size: clamp(2.1rem, 4.6vw, 3.6rem); margin-top: 16px; } }
.intro-copy { display: flex; flex-direction: column; gap: 18px; color: var(--ink-2); font-size: 1.05rem; .text-link { color: var(--ink); margin-top: 6px; width: fit-content; } }
@media (max-width: 820px) { .intro-grid { grid-template-columns: 1fr; } }

.service-rows { border-top: 1px solid var(--line-soft); }
.s-row { display: grid; grid-template-columns: 54px 1.1fr 1.4fr 30px; align-items: center; gap: 18px; padding: 24px 6px; border-bottom: 1px solid var(--line-soft); text-decoration: none; transition: background .25s, padding-left .25s;
  &:hover { background: rgba(255,255,255,.025); padding-left: 14px; }
  .s-n { color: var(--accent); font-family: var(--font-display); font-style: italic; }
  .s-name { font-family: var(--font-display); font-size: clamp(1.25rem, 2.4vw, 1.7rem); }
  .s-note { color: var(--muted); font-size: .95rem; }
  .s-arrow { color: var(--muted); }
}
@media (max-width: 720px) { .s-row { grid-template-columns: 40px 1fr 24px; .s-note { display: none; } } }

.reel { position: relative; padding-block: clamp(90px, 12vw, 160px); overflow: hidden;
  img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
  .reel-shade { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(10,9,7,.9), rgba(10,9,7,.45) 60%, rgba(10,9,7,.25)); }
  .reel-content { position: relative; max-width: var(--wrap);
    h2 { font-size: clamp(2.2rem, 5vw, 3.8rem); margin-top: 16px; }
    p:not(.eyebrow) { margin: 20px 0 30px; color: #e0d7c6; max-width: 48ch; } }
}
.closing { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 20px;
  .eyebrow::before { display: none; } h2 { font-size: clamp(2.4rem, 6vw, 4.4rem); } .lede { text-align: center; } }
</style>
