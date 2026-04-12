import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const newProducts = [
  {
    id: 'crane-iron-001',
    name: 'Slow-Release Iron Supplement (Pack of 3)',
    description: 'Slow Fe slow-release iron tablets. Gentle on the stomach, clinically proven to reduce iron deficiency. Pack of 3 for sustained supplementation.',
    price: 24.99,
    priceDisplay: '$24.99',
    image: 'https://m.media-amazon.com/images/I/71p8Q8k7rzL._SL1500_.jpg',
    rating: 4.6,
    reviewCount: 12400,
    affiliateUrl: 'https://www.amazon.com/Slow-Release-Iron-Tablets-Pack/dp/B011A4NVG4?linkCode=ll2&tag=dailygiftshuf-20&linkId=23a25ffacf4680b15ab468f93c76941c&language=en_US&ref_=as_li_ss_tl',
    asin: 'B011A4NVG4',
    recipients: ['her', 'mom'],
    budgetTier: 'under25',
    occasions: ['justBecause', 'birthday'],
    tags: ['wellness'],
    status: 'published',
    isCranesListItem: true,
    topicTags: ['health', 'wellness', 'supplements'],
  },
  {
    id: 'crane-pet-001',
    name: 'Blue Buffalo Health Bars Apple & Yogurt Dog Treats',
    description: 'Oven-baked dog biscuits made with wholesome ingredients. Apple and yogurt flavor. No corn, wheat, soy, or artificial preservatives.',
    price: 12.99,
    priceDisplay: '$12.99',
    image: 'https://m.media-amazon.com/images/I/81Q7k8B8mOL._SL1500_.jpg',
    rating: 4.7,
    reviewCount: 8900,
    affiliateUrl: 'https://www.amazon.com/Blue-Buffalo-Biscuits-Oven-Baked-Ingredients/dp/B0D9HMCYKC?linkCode=ll2&tag=dailygiftshuf-20&linkId=5049fd33b9357f28fd0b49c7b058810f&language=en_US&ref_=as_li_ss_tl',
    asin: 'B0D9HMCYKC',
    recipients: ['pets', 'friends', 'her', 'him'],
    budgetTier: 'under25',
    occasions: ['justBecause', 'birthday'],
    tags: ['pets'],
    status: 'published',
    isCranesListItem: true,
    topicTags: ['pets', 'dogs', 'pet-gifts'],
  },
];

async function main() {
  for (const product of newProducts) {
    await redis.hset(`admin:product:${product.id}`, product);
    await redis.sadd('admin:products', product.id);
    console.log('Added:', product.name);
  }
  console.log('Done');
}

main().catch(console.error);
