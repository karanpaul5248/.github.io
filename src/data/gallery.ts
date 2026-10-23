/**
 * GALLERY DATA — the single place to edit gallery images.
 * ------------------------------------------------------------------
 * OWNER NOTE (placeholder imagery):
 * The original repository contained only ONE usable photograph
 * (preserved at /assets/hero-original.jpg, used on the Home page).
 * The old gallery folders contained README placeholders only — no
 * gallery photographs were actually present.
 *
 * Therefore the items below use temporary editorial stock images from
 * Unsplash (images.unsplash.com) so the design can be judged properly.
 * They are PLACEHOLDERS. They are NOT Karan's commissioned client work
 * and must not be presented as such.
 *
 * TO USE YOUR OWN PHOTOS:
 * 1. Put the file in public/assets/gallery/  (e.g. public/assets/gallery/wedding-01.jpg)
 * 2. Change that item's `src` to '/assets/gallery/wedding-01.jpg'
 * 3. Update title / alt text. Keep titles descriptive, not client names,
 *    unless the client has consented to being featured.
 * See INSTRUCTIONS_v5.txt, section 12–13, for the full walkthrough.
 */
export type GalleryCategory =
  | 'Weddings'
  | 'Pre-Wedding'
  | 'Portraits'
  | 'Events'
  | 'Music Videos'
  | 'Travel'
  | 'Commercial'

export interface GalleryItem {
  id: string
  title: string
  category: GalleryCategory
  src: string
  alt: string
  ratio: 'tall' | 'wide' | 'square'
  featured?: boolean
  /** true = temporary stock placeholder, replace with original work */
  placeholder: boolean
}

const u = (id: string, w = 1400): string =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`

export const galleryCategories: Array<'All' | GalleryCategory> = [
  'All', 'Weddings', 'Pre-Wedding', 'Portraits', 'Events', 'Music Videos', 'Travel', 'Commercial',
]

export const galleryItems: GalleryItem[] = [
  { id: 'w1', title: 'Editorial Study — Evening Vows', category: 'Weddings', src: u('photo-1519741497674-611481863552'), alt: 'Couple beneath string lights at an evening wedding celebration (placeholder image)', ratio: 'tall', featured: true, placeholder: true },
  { id: 'w2', title: 'Editorial Study — The Exchange', category: 'Weddings', src: u('photo-1511285560929-80b456fea0bc'), alt: 'Close view of wedding hands and rings during a ceremony (placeholder image)', ratio: 'wide', placeholder: true },
  { id: 'w3', title: 'Editorial Study — Held Light', category: 'Weddings', src: u('photo-1465495976277-4387d4b0b4c6'), alt: 'Hands holding warm lights at dusk (placeholder image)', ratio: 'square', placeholder: true },
  { id: 'w4', title: 'Editorial Study — First Walk', category: 'Weddings', src: u('photo-1469371670807-013ccf25f16a'), alt: 'Outdoor celebration with guests and warm evening light (placeholder image)', ratio: 'wide', featured: true, placeholder: true },
  { id: 'p1', title: 'Editorial Study — Before the Day', category: 'Pre-Wedding', src: u('photo-1522673607200-164d1b6ce486'), alt: 'Couple holding hands in soft natural light (placeholder image)', ratio: 'tall', featured: true, placeholder: true },
  { id: 'p2', title: 'Editorial Study — Quiet Together', category: 'Pre-Wedding', src: u('photo-1529634806980-85c3dd6d34ac'), alt: 'Couple in an embrace outdoors (placeholder image)', ratio: 'square', placeholder: true },
  { id: 'p3', title: 'Editorial Study — Golden Field', category: 'Pre-Wedding', src: u('photo-1494774157365-9e04c6720e47'), alt: 'Couple standing in warm late-day light (placeholder image)', ratio: 'wide', placeholder: true },
  { id: 'po1', title: 'Portrait Study — Window Light', category: 'Portraits', src: u('photo-1494790108377-be9c29b29330'), alt: 'Portrait lit by soft window light (placeholder image)', ratio: 'tall', placeholder: true },
  { id: 'po2', title: 'Portrait Study — Character', category: 'Portraits', src: u('photo-1506794778202-cad84cf45f1d'), alt: 'Moody character portrait in low light (placeholder image)', ratio: 'square', placeholder: true },
  { id: 'po3', title: 'Portrait Study — Stillness', category: 'Portraits', src: u('photo-1531746020798-e6953c6e8e04'), alt: 'Calm portrait against a neutral background (placeholder image)', ratio: 'tall', featured: true, placeholder: true },
  { id: 'e1', title: 'Event Study — The Table', category: 'Events', src: u('photo-1511795409834-ef04bbd61622'), alt: 'Long celebration table set for an evening event (placeholder image)', ratio: 'wide', placeholder: true },
  { id: 'e2', title: 'Event Study — Confetti Hour', category: 'Events', src: u('photo-1533174072545-7a4b6ad7a6c3'), alt: 'Guests celebrating as confetti falls (placeholder image)', ratio: 'square', placeholder: true },
  { id: 'e3', title: 'Event Study — After Dark', category: 'Events', src: u('photo-1492684223066-81342ee5ff30'), alt: 'Evening event with warm string lights and guests (placeholder image)', ratio: 'wide', featured: true, placeholder: true },
  { id: 'm1', title: 'Music Video Study — Live Frame', category: 'Music Videos', src: u('photo-1493225457124-a3eb161ffa5f'), alt: 'Musician performing under stage light (placeholder image)', ratio: 'wide', featured: true, placeholder: true },
  { id: 'm2', title: 'Music Video Study — In Session', category: 'Music Videos', src: u('photo-1511671782779-c97d3d27a1d4'), alt: 'Microphone in a recording setting (placeholder image)', ratio: 'tall', placeholder: true },
  { id: 'm3', title: 'Music Video Study — The Set', category: 'Music Videos', src: u('photo-1470225620780-dba8ba36b745'), alt: 'Performer behind decks in coloured light (placeholder image)', ratio: 'square', placeholder: true },
  { id: 't1', title: 'Travel Study — Mountain Water', category: 'Travel', src: u('photo-1501785888041-af3ef285b470'), alt: 'Mountain lake at sunset (placeholder image)', ratio: 'wide', featured: true, placeholder: true },
  { id: 't2', title: 'Travel Study — High Country', category: 'Travel', src: u('photo-1506905925346-21bda4d32df4'), alt: 'Alpine peak above a valley (placeholder image)', ratio: 'tall', placeholder: true },
  { id: 't3', title: 'Travel Study — Old Streets', category: 'Travel', src: u('photo-1502602898657-3e91760cbb34'), alt: 'Historic city street in warm light (placeholder image)', ratio: 'square', placeholder: true },
  { id: 't4', title: 'Travel Study — The Crossing', category: 'Travel', src: u('photo-1476514525535-07fb3b4ae5f1'), alt: 'Boat crossing calm water between hills (placeholder image)', ratio: 'wide', placeholder: true },
  { id: 'c1', title: 'Commercial Study — The Storefront', category: 'Commercial', src: u('photo-1441986300917-64674bd600d8'), alt: 'Retail interior photographed for a brand story (placeholder image)', ratio: 'wide', placeholder: true },
  { id: 'c2', title: 'Commercial Study — On Set', category: 'Commercial', src: u('photo-1485846234645-a62644f84728'), alt: 'Film production set with camera and lighting (placeholder image)', ratio: 'square', placeholder: true },
  { id: 'c3', title: 'Commercial Study — Craft', category: 'Commercial', src: u('photo-1556742049-0cfed4f6a45d'), alt: 'Small business owner at work with a customer (placeholder image)', ratio: 'tall', placeholder: true },
  { id: 'c4', title: 'Commercial Study — Production Light', category: 'Commercial', src: u('photo-1478720568477-152d9b164e26'), alt: 'Cinema camera silhouette against production light (placeholder image)', ratio: 'wide', placeholder: true },
]
