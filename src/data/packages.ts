export interface Pkg {
  id: string
  index: string
  name: string
  price: number | null
  priceNote: string
  blurb: string
  points: string[]
  featured?: boolean
  cta: string
}

/** Confirmed prices in CAD — provided by the owner. Do not alter without instruction. */
export const packages: Pkg[] = [
  {
    id: 'photography',
    index: '01',
    name: 'Full-Day Photography',
    price: 1200,
    priceNote: 'CAD',
    blurb: 'Dedicated photography coverage throughout your event — composed, unobtrusive, and attentive to the moments in between.',
    points: ['Full-day photography coverage', 'Editorial, considered composition', 'Coverage details confirmed in your written quote'],
    cta: 'Enquire about photography',
  },
  {
    id: 'videography',
    index: '02',
    name: 'Full-Day Videography',
    price: 1800,
    priceNote: 'CAD',
    blurb: 'Dedicated video coverage and cinematic storytelling, shaped around the sound, light and feeling of the day.',
    points: ['Full-day videography coverage', 'Cinematic storytelling approach', 'Film details confirmed in your written quote'],
    cta: 'Enquire about videography',
  },
  {
    id: 'photo-video',
    index: '03',
    name: 'Photography + Videography',
    price: 2800,
    priceNote: 'CAD',
    blurb: 'One coordinated team for stills and film, so the story of the day is told completely and consistently.',
    points: ['Photography and videography together', 'One creative approach across both', 'Coverage details confirmed in your written quote'],
    cta: 'Enquire about photo + film',
  },
  {
    id: 'complete',
    index: '04',
    name: 'Complete Wedding Package',
    price: 3200,
    priceNote: 'CAD',
    blurb: 'Photography, videography and drone coverage in a single complete package for the full arc of a wedding day.',
    points: ['Photography and videography included', 'Drone coverage included in this package', 'Drone flights remain subject to regulations, permissions, weather and site restrictions'],
    featured: true,
    cta: 'Enquire about the complete package',
  },
  {
    id: 'music-video',
    index: '05',
    name: 'Cinematic Music Video',
    price: 2200,
    priceNote: 'CAD · per music video',
    blurb: 'A professionally cinematic music video, built around your sound, your style and a clear creative direction.',
    points: ['Cinematic music-video production', 'Creative direction discussed before production', 'Scope confirmed in your written quote'],
    cta: 'Enquire about a music video',
  },
]

export const additionalServices: string[] = [
  'Pre-wedding shoots',
  'Ceremony coverage',
  'Reception coverage',
  'Anand Karaj and Punjabi weddings',
  'Destination weddings',
  'Birthdays and private events',
  'Travel films',
  'Commercial and promotional projects',
  'Customized coverage for unique events',
]

export const formatCad = (n: number): string =>
  '$' + n.toLocaleString('en-CA')
