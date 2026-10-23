import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Scroll-triggered reveals for elements marked [data-reveal] inside root. */
export function useReveals(getRoot: () => HTMLElement | null) {
  let ctx: gsap.Context | undefined
  onMounted(() => {
    const root = getRoot()
    if (!root || prefersReducedMotion()) return
    ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.fromTo(el,
          { y: 34, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, ease: 'power3.out',
            delay: Number(el.dataset.delay || 0),
            scrollTrigger: { trigger: el, start: 'top 88%', once: true }
          })
      })
    }, root)
  })
  onUnmounted(() => { ctx?.revert() })
}

export function useSeo(title: string, description: string) {
  onMounted(() => {
    document.title = title
    let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!tag) {
      tag = document.createElement('meta')
      tag.name = 'description'
      document.head.appendChild(tag)
    }
    tag.content = description
    const og = document.querySelector<HTMLMetaElement>('meta[property="og:title"]')
    if (og) og.content = title
  })
}
