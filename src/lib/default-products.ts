export type DefaultProduct = {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  description: string;
  priceCents: number;
  badge: string | null;
  heroImage: string;
  gallery: string[];
  tags: string[];
  featured: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export const DEFAULT_TIMESTAMP = "2026-03-29T00:00:00.000Z";

export const defaultProducts: DefaultProduct[] = [
  {
    id: "prod_jungle_fire_duster",
    slug: "jungle-fire-duster",
    name: "Jungle Fire Duster",
    tagline: "Leopard silk with hand block trim",
    description:
      "A flowing duster made for ceremony, travel, and late light. The shape stays open and dramatic, while the belt lets you cinch it close when the moment asks for structure.",
    priceCents: 9800,
    badge: "New Arrival",
    heroImage: "/devi/devi-4.jpg",
    gallery: ["/devi/devi-3.jpg", "/devi/devi-4.jpg"],
    tags: ["duster", "ritual", "silk", "layering"],
    featured: true,
    active: true,
    createdAt: DEFAULT_TIMESTAMP,
    updatedAt: DEFAULT_TIMESTAMP,
  },
  {
    id: "prod_river_offering_dress",
    slug: "river-offering-dress",
    name: "River Offering Dress",
    tagline: "Water-white, rope belt, ceremony ready",
    description:
      "Soft, weightless cotton with wrap straps that feel secure in motion. It is cut for river offerings, warm evenings, and the kind of dressing that feels devotional without being precious.",
    priceCents: 8400,
    badge: "Sacred White",
    heroImage: "/devi/devi-5.jpg",
    gallery: ["/devi/devi-5.jpg"],
    tags: ["dress", "cotton", "water", "ceremony"],
    featured: false,
    active: true,
    createdAt: DEFAULT_TIMESTAMP,
    updatedAt: DEFAULT_TIMESTAMP,
  },
  {
    id: "prod_earth_water_wrap",
    slug: "earth-water-wrap",
    name: "Earth & Water Wrap Skirt",
    tagline: "Hand-drawn waves, grounded leopard path",
    description:
      "A wrap skirt that stays centered through practice and movement. It ties with ease, opens beautifully in motion, and keeps enough structure to move from ritual space into the street.",
    priceCents: 6200,
    badge: "Restock",
    heroImage: "/devi/devi-2.jpg",
    gallery: ["/devi/devi-2.jpg", "/devi/devi-1.jpg"],
    tags: ["wrap", "dance", "cotton", "print"],
    featured: false,
    active: true,
    createdAt: DEFAULT_TIMESTAMP,
    updatedAt: DEFAULT_TIMESTAMP,
  },
];
