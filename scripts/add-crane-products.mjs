import { REDIS_URL, REDIS_TOKEN } from './lib/redis-env.mjs';

async function redisGet(key) {
  const res = await fetch(`${REDIS_URL}/get/${key}`, {
    headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
  });
  const json = await res.json();
  return json.result ? JSON.parse(json.result) : null;
}

async function redisSet(key, value) {
  const res = await fetch(`${REDIS_URL}/set/${key}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${REDIS_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(JSON.stringify(value)),
  });
  return res.json();
}

const newProducts = [
  {
    id: 'admin-20260322-adorever-frother',
    name: 'Adorever Milk Frothing Pitcher – Stainless Steel with Thermometer, Art Pen & Brush',
    description: 'Stainless steel espresso steaming pitcher for barista-style latte art at home. Comes complete with a milk jug, latte art pen, clip-on thermometer, and cleaning brush. Perfect for cappuccinos, lattes, and macchiatos.',
    price: 9.99,
    priceDisplay: '$9.99',
    image: '',
    rating: 4.5,
    reviewCount: 0,
    affiliateUrl: 'https://www.amazon.com/dp/B07KFYXTRR?social_share=cm_sw_r_cso_wa_apin_ct_FEDVNJ9M1JKCP2HDZZ1D&th=1&linkCode=ll2&tag=dailygiftshuf-20&linkId=f0c502ff75be422177e13aed8ce37c83&language=en_US&ref_=as_li_ss_tl',
    asin: 'B07KFYXTRR',
    recipients: ['her', 'him', 'mom', 'dad', 'friends', 'coworker'],
    budgetTier: 'under25',
    occasions: ['birthday', 'holiday', 'justBecause'],
    tags: ['kitchen', 'coffee'],
    status: 'published',
    cranes: true,
    createdAt: '2026-03-22T17:53:00.000Z',
    updatedAt: '2026-03-22T17:53:00.000Z',
  },
  {
    id: 'admin-20260322-homee-knockbox',
    name: 'HOMEE Coffee Knock Box – 4.8 Inch, Removable Heavy-Duty Shock-Absorbent',
    description: 'Compact 4.8-inch espresso knock box with a removable heavy-duty rubber bar and shock-absorbent base. Sturdy stainless steel build that holds its ground on any countertop. A must-have for home baristas.',
    price: 0,
    priceDisplay: '',
    image: '',
    rating: 4.5,
    reviewCount: 0,
    affiliateUrl: 'https://www.amazon.com/HOMEE-Removable-Heavy-Duty-Shock-Absorbent-Accessories/dp/B083TMTWVC?crid=19UUA9QWLVUHT&dib=eyJ2IjoiMSJ9.E6T260v0i5dspRTnQljooAQ1-_CTU7B9ODfd9JpsiSK_Pcbb9fU4MkVeqJsS0cNx8ibUGk4rGICqe92LQlp79mELnr7PTMWQ1zQzbywQ3m_bDrB-832kx5r1Km_a1Dwif5CuKW8jckCJNNhlZxEkzhwDIvzXfXdJ6AJhOQ3ACchvA39bmU8qQJj6ABIykpFbSbZr4Ri3hbgtTyB08dUlwRn0sTIFO27FLbObBBk99bh4VdYmYpuHSzQRXudAShluTa-ujtgnZPnxMrpyUYWhLBOQCwGRcz9I1kE39-OeCLA.zqVTcUzpCz04OQmL0cZkbjYFV6yS3X0y9OofrA2dw3w&dib_tag=se&keywords=Homee%2Bcoffee%2Bknock%2Bbox%2B4.8%2Binch&qid=1774201759&s=home-garden&sprefix=homee%2Bcoffee%2Bknock%2Bbox%2B4.8%2Binch%2Cgarden%2C172&sr=1-4&th=1&linkCode=ll2&tag=dailygiftshuf-20&linkId=f40d3f6076a56176cd471cc010127ca8&language=en_US&ref_=as_li_ss_tl',
    asin: 'B083TMTWVC',
    recipients: ['him', 'dad', 'mom', 'her', 'friends', 'coworker'],
    budgetTier: 'under25',
    occasions: ['birthday', 'holiday', 'justBecause'],
    tags: ['kitchen', 'coffee'],
    status: 'published',
    cranes: true,
    createdAt: '2026-03-22T17:53:00.000Z',
    updatedAt: '2026-03-22T17:53:00.000Z',
  },
  {
    id: 'admin-20260322-kindle-16gb',
    name: 'Amazon Kindle 16 GB (Newest Model) – Lightest & Most Compact, Faster Page Turns',
    description: 'The newest Amazon Kindle with 16GB storage, the lightest and most compact design yet, faster page turns, and a higher contrast ratio display. Weeks of battery life. Perfect for avid readers who want the most portable e-reader available.',
    price: 109.99,
    priceDisplay: '$109.99',
    image: '',
    rating: 4.5,
    reviewCount: 0,
    affiliateUrl: 'https://www.amazon.com/Amazon-Kindle/dp/B0CNVCQZG1?crid=IJ3PWP8H1K7&dib=eyJ2IjoiMSJ9.23nKJhbSajGSR10WFLySP_1CAGBWpVowB4u3d6FG3ZiJLwYPV2oOnxigPBk5YBxr0yxSWTTn9gYA_Ayry0st642Zv6mOtqlzBWtybg7jewPFxyR7vRx74H_XCq01cKwBWiUZ1uo4Yri0nyxESY23rowE6XS2QTnGqm78SW0rkFqRygKKtdEJZ2WCRiEzcmMsyfLun2gcmw61AwO3vNog1Pv0lMDmcRxjVY8p4vY9UNdQ2iqHKp70Uh5_VQPL8q4q0iX8hsRCI1t84ptpArapPzxCSnWEWYqMy78u_YEitHg.TWnIVNSWTNRFexDvtLBUow4G7707uxrvdMkkQ3IWZ_g&dib_tag=se&keywords=Amazon%2BKindle%2B16%2BGB%2B%28newest%2Bmodel%29%2B-%2BLightest%2Band%2Bmost%2Bcompact%2BKindle%2C%2Bnow%2Bwith%2Bfaster%2Bpage%2Bturns%2C%2Band%2Bhigher%2Bcontrast%2Bratio&nsdOptOutParam=true&qid=1774201799&s=amazon-devices&sprefix=amazon%2Bkindle%2B16%2Bgb%2Bnewest%2Bmodel%2B-%2Blightest%2Band%2Bmost%2Bcompact%2Bkindle%2C%2Bnow%2Bwith%2Bfaster%2Bpage%2Bturns%2C%2Band%2Bhigher%2Bcontrast%2Bratio%2Camazon-devices%2C176&sr=1-1&ufe=app_do%3Aamzn1.fos.ed73e2ba-4d06-4781-aee7-c317fe036206&th=1&linkCode=ll2&tag=dailygiftshuf-20&linkId=0b4529db48def34533d28018795e47f1&language=en_US&ref_=as_li_ss_tl',
    asin: 'B0CNVCQZG1',
    recipients: ['her', 'him', 'mom', 'dad', 'teens', 'friends', 'grandparents'],
    budgetTier: '100to150',
    occasions: ['birthday', 'holiday', 'graduation'],
    tags: ['tech', 'hobby'],
    status: 'published',
    cranes: true,
    createdAt: '2026-03-22T17:53:00.000Z',
    updatedAt: '2026-03-22T17:53:00.000Z',
  },
];

const NEW_IDS = newProducts.map(p => p.id);

async function main() {
  console.log('Fetching current products from Redis...');
  const current = await redisGet('admin:products');
  if (!current) {
    console.error('No products found in Redis! Aborting.');
    process.exit(1);
  }
  console.log(`Current count: ${current.length}`);

  // Remove any existing entries with same IDs (idempotent)
  const filtered = current.filter(p => !NEW_IDS.includes(p.id));
  const updated = [...filtered, ...newProducts];

  console.log(`Writing ${updated.length} products back to Redis...`);
  const result = await redisSet('admin:products', updated);
  console.log('Redis response:', result);
  console.log(`Done! Added ${newProducts.length} products. New total: ${updated.length}`);
}

main().catch(console.error);
