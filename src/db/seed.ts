import type { ProductImage, SpecRow } from "./schema";

const IMG = {
  bracelet: "/images/object-bracelet.jpg",
  wallet: "/images/object-wallet.jpg",
  journal: "/images/object-journal.jpg",
  hat: "/images/object-hat.jpg",
  limited: "/images/object-limited.jpg",
  carryall: "/images/object-carryall.jpg",
  craft: "/images/craft.jpg",
  hero: "/images/hero.jpg",
  editorial: "/images/journal-featured.jpg",
  room: "/images/private-room.jpg",
};

export type ProductSeed = {
  slug: string;
  objectNo: string;
  name: string;
  category: string;
  collection: string;
  drop: string;
  material: string;
  price: number;
  edition: string;
  stock: number;
  limited: boolean;
  sortOrder: number;
  tagline: string;
  story: string;
  whyItExists: string;
  materialNote: string;
  fit: string;
  dropNote: string;
  images: ProductImage[];
  specs: SpecRow[];
};

export const PRODUCT_SEED: ProductSeed[] = [
  {
    slug: "signature-bracelet",
    objectNo: "007",
    name: "Signature Bracelet",
    category: "Wrist",
    collection: "House Signatures",
    drop: "Drop 001",
    material: "Leather & Steel",
    price: 129,
    edition: "Limited / 42 remaining",
    stock: 42,
    limited: true,
    sortOrder: 1,
    tagline: "The object that started the house.",
    story:
      "There is a version of you that only appears when the room gets difficult. Calmer. Quieter. More certain. The Signature Bracelet was built for that version — a single band of Tuscan leather closed with a brushed steel plate that carries nothing but the house mark. No motto. No slogan. Nothing to explain to anyone.",
    whyItExists:
      "We made it because every man owns something he touches before he walks into a hard conversation. A ring. A watch. A coin. A habit. We wanted that object to be deliberate instead of accidental — something chosen, not inherited by default. It sits at the wrist because the wrist is where the pulse is, and where people look when you offer your hand.",
    materialNote:
      "Cut from a single hide of vegetable-tanned full-grain leather, 1.4mm, then hand-burnished at the edges. The closure plate is 316L stainless, satin-finished, sealed against sweat and salt water. Expect the leather to darken at the flex point within three weeks. That darkening is the point.",
    fit: "Three sizes — 18cm, 19.5cm, 21cm. Measure the wrist bone with a cord, add 1cm for a close fit, 1.5cm for a lived-in fit. Between sizes: take the larger. The leather relaxes roughly 4mm in the first month of wear.",
    dropNote:
      "Released as the opening object of Drop 001. Numbered, not restocked. When this run closes, the next bracelet carries a different plate and a different chapter number.",
    images: [
      { src: IMG.bracelet, alt: "AURELIAN Signature Bracelet on black volcanic stone", focus: "50% 50%" },
      { src: IMG.craft, alt: "Cutting the leather band in the atelier", focus: "50% 45%" },
      { src: IMG.hero, alt: "Signature Bracelet worn with a charcoal tailored jacket", focus: "45% 55%" },
    ],
    specs: [
      { label: "Material", value: "Full-grain Tuscan leather / 316L steel" },
      { label: "Width", value: "9mm" },
      { label: "Closure", value: "Magnetic plate, security fold" },
      { label: "Weight", value: "34g" },
      { label: "Made in", value: "Florence, Italy" },
    ],
  },
  {
    slug: "voyager-wallet",
    objectNo: "014",
    name: "Voyager Wallet",
    category: "Carry",
    collection: "House Signatures",
    drop: "Drop 001",
    material: "Leather",
    price: 168,
    edition: "Limited / 60 remaining",
    stock: 60,
    limited: true,
    sortOrder: 2,
    tagline: "Six cards. One note. No bulk.",
    story:
      "A wallet is the most public private object a man owns. It leaves your pocket on command, in front of strangers, and it says something before you do. The Voyager carries six cards, folded notes and a key — and collapses to the thickness of a lighter when it does.",
    whyItExists:
      "Most men carry a filing cabinet. We wanted a filter. If an object cannot survive ten years of pockets, airport trays and bar tops, it does not belong in the house. The Voyager is built from one piece of leather folded rather than stitched together, which means there is no lining to split and no seam to fail first.",
    materialNote:
      "Single-piece construction in 1.2mm full-grain leather, saddle-stitched with waxed linen thread at 7 stitches per inch. Interior is unlined — raw leather, no fabric — so it patinas uniformly. Edges hand-rubbered in six passes.",
    fit: "104mm x 76mm closed. Holds 6 embossed cards, up to 12 flat cards, folded notes. Weighs 48g empty. It will feel tight for the first ten days. That is correct — do not force the sixth card.",
    dropNote: "Part of the opening chapter. Produced alongside the Signature Bracelet in the same hide lot.",
    images: [
      { src: IMG.wallet, alt: "Voyager Wallet in full-grain black leather on walnut and marble", focus: "50% 50%" },
      { src: IMG.craft, alt: "Saddle stitching the wallet at the bench", focus: "40% 50%" },
      { src: IMG.room, alt: "Wallet on dark concrete in the private room", focus: "50% 60%" },
    ],
    specs: [
      { label: "Material", value: "Full-grain leather, unlined" },
      { label: "Capacity", value: "6 cards + folded notes" },
      { label: "Dimensions", value: "104 x 76 x 9mm" },
      { label: "Thread", value: "Waxed linen, saddle stitch" },
      { label: "Made in", value: "Florence, Italy" },
    ],
  },
  {
    slug: "obsidian-cuff",
    objectNo: "001",
    name: "Obsidian Cuff",
    category: "Wrist",
    collection: "Numbered Editions",
    drop: "Drop 001",
    material: "Stone & Brass",
    price: 340,
    edition: "Numbered / 18 remaining",
    stock: 18,
    limited: true,
    sortOrder: 3,
    tagline: "The first object. Never repeated.",
    story:
      "Object 001 is the reason the house exists. A cut of obsidian set into antique champagne brass, weighted so you feel it arrive on the wrist. Each piece is numbered on the underside — 001 through 120, then the mould is destroyed.",
    whyItExists:
      "We wanted one object that could not be mass-produced without lying about itself. The stone is cut by hand, so no two faces reflect light the same way. If you want something that looks identical to everyone else's, there are a thousand brands waiting to sell it to you.",
    materialNote:
      "Natural obsidian, hand-ground and polished over 11 hours. Brass frame cast in a Florence foundry, hand-engraved with the house mark, then sealed with a matte PVD that lets it age without corroding. Stone will stay cold for the first four minutes of wear.",
    fit: "Internal circumference 17.5cm — a precise, close fit. It does not flex. If you are between sizes, size up; the cuff should sit against the wrist bone, not past it.",
    dropNote: "Numbered edition of 120. Released 08.26.26. No restock, no re-issue, no second run.",
    images: [
      { src: IMG.limited, alt: "Obsidian Cuff with champagne brass on a brushed metal plinth", focus: "50% 50%" },
      { src: IMG.bracelet, alt: "Detail of metal and stone next to the Signature Bracelet", focus: "50% 45%" },
      { src: IMG.editorial, alt: "Obsidian Cuff worn at night", focus: "50% 40%" },
    ],
    specs: [
      { label: "Stone", value: "Natural obsidian, hand-ground" },
      { label: "Frame", value: "Antique champagne brass, PVD sealed" },
      { label: "Edition", value: "120 numbered pieces" },
      { label: "Weight", value: "71g" },
      { label: "Made in", value: "Florence, Italy" },
    ],
  },
  {
    slug: "chronicle-journal",
    objectNo: "021",
    name: "Chronicle Journal",
    category: "Paper",
    collection: "House Signatures",
    drop: "Drop 001",
    material: "Leather & Brass",
    price: 94,
    edition: "Open edition",
    stock: 240,
    limited: false,
    sortOrder: 4,
    tagline: "Paper for the decisions you have not made yet.",
    story:
      "Every man keeps a record somewhere. Notes app. Napkins. The back of a boarding pass. The Chronicle is a place to put it that will still exist in fifteen years — 224 pages of heavy ivory stock, brass post binding, a cover that takes the shape of your bag.",
    whyItExists:
      "Because the interesting part of a life is not the outcome, it is the version of the plan that failed. The pages are unlined on purpose. Structure is a choice, not a default.",
    materialNote:
      "224 pages, 120gsm ivory stock, FSC certified, sewn in 16-page signatures so it opens flat. Brass posts can be unscrewed with a coin to archive a finished volume. Cover leather is the same hide lot as the Voyager Wallet.",
    fit: "A5 — 148 x 210mm, 21mm spine. Lies flat at any page. Fits the inner pocket of the Voyager and the Carryall's document sleeve.",
    dropNote: "The Chronicle is a permanent house object. Refills are released every January.",
    images: [
      { src: IMG.journal, alt: "Chronicle Journal open on smoked black marble", focus: "50% 50%" },
      { src: IMG.craft, alt: "Sewing the journal signatures", focus: "55% 50%" },
      { src: IMG.wallet, alt: "Journal beside the Voyager Wallet", focus: "50% 55%" },
    ],
    specs: [
      { label: "Pages", value: "224 / 120gsm ivory" },
      { label: "Binding", value: "Brass posts, sewn signatures" },
      { label: "Size", value: "A5 — 148 x 210mm" },
      { label: "Refillable", value: "Yes, standard A5" },
      { label: "Made in", value: "Florence, Italy" },
    ],
  },
  {
    slug: "meridian-hat",
    objectNo: "009",
    name: "Meridian Hat",
    category: "Head",
    collection: "House Standards",
    drop: "Drop 001",
    material: "Cotton & Felt",
    price: 145,
    edition: "Limited / 75 remaining",
    stock: 75,
    limited: true,
    sortOrder: 5,
    tagline: "Shadow, on purpose.",
    story:
      "A hat changes the way a man enters a room, and the way the room reads him. The Meridian has a wide flat brim and a low, structured crown — architecture rather than costume. It casts a shadow across the eyes and leaves the mouth visible.",
    whyItExists:
      "Because most men's hats are either jokes or uniforms. We wanted one that behaves like a jacket: silent, structured, correct in a hotel lobby and correct at 2am.",
    materialNote:
      "420gsm heavy brushed cotton canvas, double washed for softness, blocked over a wooden form. Internal grosgrain sweatband, hidden brass eyelets, brim reinforced with a folded steel core that holds its line in wind.",
    fit: "S/M 55-57cm, L/XL 58-60cm. Internal drawcord lets you tighten by up to 8mm. Brim 8.5cm, crown 10.5cm. Wear it low or not at all.",
    dropNote: "Produced in a single colourway for Drop 001 — Obsidian. A maroon version arrives with Drop 002.",
    images: [
      { src: IMG.hat, alt: "Meridian Hat in a dark architectural environment", focus: "50% 45%" },
      { src: IMG.hero, alt: "Meridian Hat styled with charcoal tailoring", focus: "50% 35%" },
      { src: IMG.editorial, alt: "Hat worn from behind at a night window", focus: "50% 50%" },
    ],
    specs: [
      { label: "Shell", value: "420gsm brushed cotton canvas" },
      { label: "Brim", value: "8.5cm, steel core" },
      { label: "Sizes", value: "S/M 55-57cm, L/XL 58-60cm" },
      { label: "Colourway", value: "Obsidian" },
      { label: "Made in", value: "Porto, Portugal" },
    ],
  },
  {
    slug: "carryall-48",
    objectNo: "032",
    name: "Carryall 48",
    category: "Carry",
    collection: "House Standards",
    drop: "House Standard",
    material: "Leather & Steel",
    price: 520,
    edition: "Open edition",
    stock: 30,
    limited: false,
    sortOrder: 6,
    tagline: "Forty-eight hours, one object.",
    story:
      "Built around a simple test: if you cannot leave for two days with one bag, you are carrying decisions you have not made. The Carryall 48 holds three shirts, two shoes, a laptop, a wash kit and a journal — and still fits an overhead bin.",
    whyItExists:
      "Hardware is where bags fail. We used solid brass zips on steel tape, riveted rather than sewn at every stress point, and a reinforced base panel that stands up on its own when you set it down.",
    materialNote:
      "2.0mm full-grain leather body, 1680D ballistics base, solid brass hardware, hand-hammered copper rivets, cotton twill lining. Shoulder straps are 12mm vegetable-tanned leather wrapped around a cotton core.",
    fit: "54 x 28 x 26cm, 38L. 1.9kg empty. Cabin compliant on most carriers. Document sleeve fits A5 and 14\" laptops.",
    dropNote: "A permanent house object. Repairs are handled in-house for life.",
    images: [
      { src: IMG.carryall, alt: "Carryall 48 detail with brushed steel hardware on concrete", focus: "50% 50%" },
      { src: IMG.wallet, alt: "Leather texture detail of the Carryall", focus: "50% 60%" },
      { src: IMG.room, alt: "Carryall resting in the private room", focus: "50% 55%" },
    ],
    specs: [
      { label: "Volume", value: "38L" },
      { label: "Body", value: "2.0mm full-grain leather" },
      { label: "Base", value: "1680D ballistics nylon" },
      { label: "Hardware", value: "Solid brass, copper rivets" },
      { label: "Made in", value: "Florence, Italy" },
    ],
  },
  {
    slug: "contour-card-case",
    objectNo: "028",
    name: "Contour Card Case",
    category: "Carry",
    collection: "House Standards",
    drop: "House Standard",
    material: "Leather",
    price: 88,
    edition: "Open edition",
    stock: 180,
    limited: false,
    sortOrder: 7,
    tagline: "The minimum viable pocket.",
    story:
      "Four cards, one fold, nothing else. The Contour exists for the nights you do not want to carry a history — the shape of a house key pressed into the leather so you feel it before you reach the door.",
    whyItExists:
      "It is the object we give to men who claim they carry nothing. After three weeks they come back for the wallet. That is the design working.",
    materialNote:
      "Two-layer 1.1mm full-grain leather, skived to 1.8mm total at the mouth. Unlined, edge-painted in four passes, thumb notch cut at 32 degrees.",
    fit: "98 x 68mm. Holds 2-4 cards plus a folded note or a key. 22g.",
    dropNote: "Permanent house object. Ships in the same black box as the rest of the house.",
    images: [
      { src: IMG.wallet, alt: "Contour Card Case in black full-grain leather", focus: "35% 45%" },
      { src: IMG.craft, alt: "Skiving the card case at the bench", focus: "50% 55%" },
      { src: IMG.journal, alt: "Card case beside the Chronicle Journal", focus: "50% 45%" },
    ],
    specs: [
      { label: "Material", value: "1.1mm full-grain leather, unlined" },
      { label: "Capacity", value: "2-4 cards" },
      { label: "Dimensions", value: "98 x 68 x 4mm" },
      { label: "Weight", value: "22g" },
      { label: "Made in", value: "Florence, Italy" },
    ],
  },
  {
    slug: "atelier-key-fob",
    objectNo: "035",
    name: "Atelier Key Fob",
    category: "Carry",
    collection: "House Standards",
    drop: "House Standard",
    material: "Leather & Brass",
    price: 64,
    edition: "Open edition",
    stock: 210,
    limited: false,
    sortOrder: 8,
    tagline: "The smallest object with the loudest opinion.",
    story:
      "You touch it six times a day, usually in a doorway, usually in front of someone. A folded leather loop, a solid brass ring, a hand-set brass rivet. It clicks against the door frame and announces you before you speak.",
    whyItExists:
      "It is the cheapest way we know to put real material in a man's hand every day. No logo visible unless you turn it over. The house mark is on the inside, where only you find it.",
    materialNote:
      "Three-layer 1.2mm full-grain leather, hand-stitched with waxed linen, solid brass 25mm ring, copper rivet set by hand. Edges burnished with beeswax.",
    fit: "95mm total length, 22mm wide. Holds 3-8 keys. 31g with ring.",
    dropNote: "Permanent house object. Often the first thing a man buys from us.",
    images: [
      { src: IMG.bracelet, alt: "Atelier Key Fob leather and brass detail", focus: "60% 60%" },
      { src: IMG.craft, alt: "Hand-setting the brass rivet", focus: "50% 50%" },
      { src: IMG.wallet, alt: "Fob resting on the Voyager Wallet", focus: "55% 50%" },
    ],
    specs: [
      { label: "Material", value: "Full-grain leather, solid brass ring" },
      { label: "Length", value: "95mm" },
      { label: "Fixing", value: "Hand-set copper rivet" },
      { label: "Weight", value: "31g" },
      { label: "Made in", value: "Florence, Italy" },
    ],
  },
];

export type JournalSeed = {
  slug: string;
  kicker: string;
  title: string;
  excerpt: string;
  body: string[];
  image: string;
  readTime: string;
  chapter: string;
  featured: boolean;
  sortOrder: number;
};

export const JOURNAL_SEED: JournalSeed[] = [
  {
    slug: "the-art-of-not-looking-like-everyone-else",
    kicker: "Chapter 01 / Identity",
    title: "The Art of Not Looking Like Everyone Else",
    excerpt:
      "Difference is not decoration. It is the discipline of removing everything that was never yours.",
    body: [
      "There is a moment in every men's wear shop when the assistant tells you what everybody is buying. It is offered as help. It is actually an instruction.",
      "Most men take the instruction. Not because they lack taste, but because taste is expensive in social currency and safety is free. The result is a city of men dressed in the same three silhouettes, at the same three price points, carrying the same three bags, wondering why nobody remembers meeting them.",
      "Not looking like everyone else has almost nothing to do with colour. It is a subtraction problem. Remove the logo that speaks for you. Remove the detail that exists to be photographed. Remove the piece you bought because a man you do not know wore it in a picture you did not choose to see.",
      "What is left is small, and it is yours. A bracelet that has darkened where your wrist bends. A wallet that has taken the shape of your back pocket. A hat with a brim that casts the exact shadow you want between you and the room.",
      "That is the whole philosophy of the house. We do not make much. We make objects that survive long enough to become evidence.",
    ],
    image: "/images/journal-featured.jpg",
    readTime: "6 min",
    chapter: "01",
    featured: true,
    sortOrder: 1,
  },
  {
    slug: "what-your-accessories-say-before-you-do",
    kicker: "Chapter 02 / Signal",
    title: "What Your Accessories Say Before You Do",
    excerpt: "You are read in the first four seconds. The objects on your body do most of the talking.",
    body: [
      "Before you have spoken, four things have already been registered: your hands, your wrist, your shoes and the object you pull out of your pocket.",
      "Hands are the most honest part of a man. They cannot be styled. But they can be framed — a watch, a bracelet, a ring, kept deliberately quiet so the hand stays the subject.",
      "The wrist is the only place where a man is allowed a small piece of sculpture in public. Treat it like that. One object, heavy enough to feel, quiet enough to ignore.",
      "Then the pocket. When you pull out a wallet in a bar, a taxi, a restaurant, you are performing a small reveal whether you intended to or not. Choose something that looks better at year five than it did at day one.",
      "None of this is about wealth. A twenty dollar object with real material beats a two thousand dollar object with a printed story, every single time.",
    ],
    image: "/images/hero.jpg",
    readTime: "4 min",
    chapter: "02",
    featured: false,
    sortOrder: 2,
  },
  {
    slug: "the-personal-uniform",
    kicker: "Chapter 03 / Restraint",
    title: "The Personal Uniform",
    excerpt: "The most stylish men you know are wearing the same seven things. On purpose.",
    body: [
      "Decision fatigue is real, and it is not sentimental — it takes the same energy you would otherwise spend on the thing that actually matters.",
      "The men who look most individual are usually the men who decided once, carefully, and then stopped deciding. A jacket shape. A trouser weight. A hat. A bracelet. Repeated until it stops being an outfit and becomes a person.",
      "The uniform is not a cage. It is a container. Inside it you are free to be interesting in every other dimension — what you say, what you build, who you let close.",
      "Start with one object you would keep in a fire. Add the second only when the first has worn in. That is how a personal uniform is built: slowly, and against the calendar of the industry.",
    ],
    image: "/images/journal-featured.jpg",
    readTime: "5 min",
    chapter: "03",
    featured: false,
    sortOrder: 3,
  },
  {
    slug: "the-objects-we-keep",
    kicker: "Chapter 04 / Memory",
    title: "The Objects We Keep",
    excerpt: "Nobody remembers the price. Everybody remembers where the object was when it happened.",
    body: [
      "Ask a man what he owns and he lists a category. Ask him what he keeps and the answer changes completely.",
      "Kept objects are marked. A wallet with the receipt from a night that went wrong. A bracelet bought the week the company collapsed. A journal with the page where a decision was finally written down.",
      "We design for the second list. Material that records. Brass that ages. Leather that darkens where a life happens to press against it.",
      "Perfection is forgettable. Wear is a biography.",
    ],
    image: "/images/object-journal.jpg",
    readTime: "3 min",
    chapter: "04",
    featured: false,
    sortOrder: 4,
  },
  {
    slug: "inside-drop-002",
    kicker: "Chapter 05 / The House",
    title: "Inside Drop 002",
    excerpt: "Nine objects. Two colourways. One material we have never used before.",
    body: [
      "Drop 002 is built around a single question: what does restraint look like when it is warm.",
      "There is a maroon version of the Meridian. There is a longer bracelet, in a heavier hide, with a plate that can be engraved after purchase. There is a jacket — the first piece of apparel the house has ever cut, in a charcoal wool that behaves more like leather.",
      "We are also introducing a material we have refused until now: a vegetable-tanned leather from a single tannery in Tuscany that finishes its hides in oak and chestnut over forty days. It is slow and it is expensive and it is the reason Drop 002 is smaller than we would like.",
      "Private room members see it fourteen days early. That is the entire advantage of being inside the house.",
    ],
    image: "/images/object-limited.jpg",
    readTime: "4 min",
    chapter: "05",
    featured: false,
    sortOrder: 5,
  },
];

// fix the featured image reference for the lead story
JOURNAL_SEED[0].image = "/images/journal-featured.jpg";
