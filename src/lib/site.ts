/**
 * AURELIAN — house constants.
 * Copy, film sources and art direction live here so the experience
 * stays consistent across the whole site.
 */

/**
 * Film sources. Every rendition is the lightest available (1080p where the
 * library allows it); mobile and reduced-motion fall back to the poster frame.
 */
export const FILM = {
  hero: "https://videos.pexels.com/video-files/5979222/5979222-hd_1920_1080_25fps.mp4",
  heroPoster: "/images/hero.jpg",
  manifesto:
    "https://videos.pexels.com/video-files/6766765/6766765-hd_1920_1080_25fps.mp4",
  craft:
    "https://videos.pexels.com/video-files/6654035/6654035-uhd_4096_2160_25fps.mp4",
  hallway:
    "https://videos.pexels.com/video-files/19217898/19217898-hd_1920_1080_30fps.mp4",
  ink: "https://videos.pexels.com/video-files/16296848/16296848-hd_1920_1080_24fps.mp4",
  surface:
    "https://videos.pexels.com/video-files/16478021/16478021-hd_1920_1080_24fps.mp4",
  droplet:
    "https://videos.pexels.com/video-files/16392049/16392049-hd_1920_1080_24fps.mp4",
  bubbles:
    "https://videos.pexels.com/video-files/16478023/16478023-hd_1920_1080_24fps.mp4",
} as const;

export const NAV = [
  { label: "The House", href: "/#house" },
  { label: "Objects", href: "/#objects" },
  { label: "Drop 001", href: "/#drop" },
  { label: "Journal", href: "/journal" },
] as const;

export const FOOTER_NAV = [
  {
    title: "House",
    links: [
      { label: "House", href: "/#house" },
      { label: "Shop", href: "/shop" },
      { label: "Collections", href: "/shop" },
      { label: "Limited Drops", href: "/#drop" },
      { label: "Journal", href: "/journal" },
      { label: "About", href: "/#manifesto" },
      { label: "Contact", href: "/#access" },
    ],
  },
  {
    title: "Customer",
    links: [
      { label: "Shipping", href: "/#access" },
      { label: "Returns", href: "/#access" },
      { label: "FAQ", href: "/#access" },
      { label: "Size Guide", href: "/#access" },
    ],
  },
  {
    title: "Social",
    links: [
      { label: "Instagram", href: "https://instagram.com" },
      { label: "Pinterest", href: "https://pinterest.com" },
      { label: "TikTok", href: "https://tiktok.com" },
    ],
  },
] as const;

export const MATERIALS = [
  {
    key: "leather",
    label: "Leather",
    name: "Full-Grain Leather",
    line: "Develops character with time.",
    image: "/images/object-wallet.jpg",
    focus: "50% 60%",
    origin: "Tuscany, IT",
    spec: "Vegetable tanned / 1.4mm",
  },
  {
    key: "steel",
    label: "Steel",
    name: "Brushed 316L Steel",
    line: "Cold until it touches skin.",
    image: "/images/object-bracelet.jpg",
    focus: "35% 45%",
    origin: "Vicenza, IT",
    spec: "Satin finished / 6mm",
  },
  {
    key: "brass",
    label: "Brass",
    name: "Antique Champagne Brass",
    line: "Ages the way you do.",
    image: "/images/object-limited.jpg",
    focus: "50% 50%",
    origin: "Florence, IT",
    spec: "Hand engraved / PVD sealed",
  },
  {
    key: "cotton",
    label: "Cotton",
    name: "Heavy Brushed Cotton",
    line: "Softness earned, not bought.",
    image: "/images/object-hat.jpg",
    focus: "50% 40%",
    origin: "Biella, IT",
    spec: "420gsm / double washed",
  },
] as const;

export const CODE_PANELS = [
  {
    index: "01",
    title: "Individuality",
    copy: "No man is a category. We build objects for the version of you that nobody else gets to meet.",
    film: "/images/object-bracelet.jpg",
    focus: "50% 50%",
  },
  {
    index: "02",
    title: "Restraint",
    copy: "One detail, placed with intent. Loudness is a shortage of conviction.",
    film: "/images/object-wallet.jpg",
    focus: "50% 55%",
  },
  {
    index: "03",
    title: "Character",
    copy: "Pressure leaves a mark. Our materials are chosen because they record it honestly.",
    film: "/images/object-limited.jpg",
    focus: "50% 50%",
  },
  {
    index: "04",
    title: "Evolution",
    copy: "Nothing here is final. Each chapter replaces the last. You are allowed to change.",
    film: "/images/journal-featured.jpg",
    focus: "50% 40%",
  },
] as const;

export const LIFESTYLE = [
  {
    src: "https://images.pexels.com/photos/9566438/pexels-photo-9566438.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=933",
    caption: "03:41 — The last fitting",
    place: "Milan",
  },
  {
    src: "https://images.pexels.com/photos/21387372/pexels-photo-21387372.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=933",
    caption: "05:12 — Before the decision",
    place: "Lisbon",
  },
  {
    src: "https://images.pexels.com/photos/34261762/pexels-photo-34261762.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=933",
    caption: "22:58 — Back seat, no music",
    place: "Night drive",
  },
  {
    src: "https://images.pexels.com/photos/37218513/pexels-photo-37218513.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=933",
    caption: "07:06 — Checking, not waiting",
    place: "Rooftop",
  },
  {
    src: "https://images.pexels.com/photos/19287301/pexels-photo-19287301.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=933",
    caption: "19:24 — The room goes quiet",
    place: "Dark hotel",
  },
  {
    src: "https://images.pexels.com/photos/6901852/pexels-photo-6901852.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=933",
    caption: "01:19 — Collar, no tie",
    place: "Private office",
  },
] as const;

export const DROP = {
  code: "DROP 001",
  chapter: "THE FIRST CHAPTER",
  released: "08.26.26",
  /** Fixed launch reference used by the countdown */
  launchIso: "2026-08-26T20:00:00.000Z",
} as const;

export const MANIFESTO_LINES = [
  "THE DETAILS YOU CHOOSE",
  "BECOME PART OF",
  "WHO YOU ARE.",
] as const;

export function formatPrice(value: number) {
  return `$${value.toLocaleString("en-US")}`;
}
