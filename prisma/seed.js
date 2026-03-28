/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const products = [
  {
    slug: 'jungle-fire-duster',
    name: 'Jungle Fire Duster',
    tagline: 'Leopard silk with hand block trim',
    description:
      'A flowing duster meant for ritual and street—tailored shoulders, generous sleeves, and a belt that lets you cinch or let go. Cut to move with dance, prayer, and the breeze.',
    priceCents: 9800,
    badge: 'New Arrival',
    heroImage: '/devi/devi-4.jpg',
    galleryJson: JSON.stringify(['/devi/devi-3.jpg', '/devi/devi-4.jpg']),
    tagsJson: JSON.stringify(['duster', 'leopard', 'ritual', 'silk']),
    featured: true,
  },
  {
    slug: 'earth-water-wrap',
    name: 'Earth & Water Wrap Skirt',
    tagline: 'Hand-drawn waves, grounded leopard path',
    description:
      'A wrap that stays put while you flow. High slit for freedom, soft tie for comfort, and breathable cotton for heat and ceremony.',
    priceCents: 6200,
    badge: 'Restock',
    heroImage: '/devi/devi-2.jpg',
    galleryJson: JSON.stringify(['/devi/devi-2.jpg', '/devi/devi-1.jpg']),
    tagsJson: JSON.stringify(['wrap', 'dance', 'cotton', 'print']),
    featured: false,
  },
  {
    slug: 'river-offering-dress',
    name: 'River Offering Dress',
    tagline: 'Water-white, rope belt, ceremony ready',
    description:
      'Inspired by sunrise offerings—lightweight cotton, wrap straps, and a skirt that shifts with the tide. Wear alone or layer under the Jungle Fire duster.',
    priceCents: 8400,
    heroImage: '/devi/devi-5.jpg',
    galleryJson: JSON.stringify(['/devi/devi-5.jpg']),
    tagsJson: JSON.stringify(['dress', 'water', 'ceremony', 'cotton']),
    featured: false,
  },
];

async function main() {
  const keepSlugs = products.map((p) => p.slug);
  await prisma.product.deleteMany({
    where: { NOT: { slug: { in: keepSlugs } } },
  });
  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }
  console.log(`Seeded ${products.length} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());
