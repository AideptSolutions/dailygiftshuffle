const REDIS_URL = 'https://social-slug-73085.upstash.io';
const REDIS_TOKEN = 'gQAAAAAAAR19AAIncDFjYmM1MjBkYTJhODA0N2E2YTBkZTc4MDJiNzlkYmU1YnAxNzMwODU';

const getRes = await fetch(REDIS_URL + '/get/admin:products', {
  headers: { Authorization: 'Bearer ' + REDIS_TOKEN }
});
const getData = await getRes.json();

// Recover the real array from the double-stringified mess
const outerParsed = JSON.parse(getData.result);  // -> { value: '[...]' }
const realArray = JSON.parse(outerParsed.value);  // -> actual array
console.log('Recovered product count:', realArray.length);

const newProducts = [
  {
    id: 'admin-20260319-jojoba-oil',
    name: 'BodyJ4You Organic Jojoba Oil — USDA Organic, 100% Pure, 1 fl oz',
    description: 'USDA certified organic jojoba oil, cold-pressed and unrefined. Use as a face moisturizer, hair serum, cuticle oil, Gua Sha carrier, dermaplaning primer, or scalp massage oil. Hexane-free, non-comedogenic, fragrance-free. One bottle does it all.',
    price: 12.99, priceDisplay: '$12.99', image: '', rating: 4.7, reviewCount: 3500,
    affiliateUrl: 'https://www.amazon.com/BodyJ4You-Organic-Jojoba-Oil-Skin/dp/B0DRML3ZMM?tag=dailygiftshuf-20&linkCode=ll2&linkId=f1adf8fa20773ad33d4a4423837eff4b&language=en_US&ref_=as_li_ss_tl',
    asin: 'B0DRML3ZMM', recipients: ['her','mom','myself-her','friends'], budgetTier: 'under25',
    occasions: ['birthday','holiday','just-because'], tags: ['beauty','selfcare','skincare'],
    status: 'published', cranes: true, createdAt: '2026-03-19T17:30:00.000Z', updatedAt: '2026-03-19T17:30:00.000Z'
  },
  {
    id: 'admin-20260319-castor-oil',
    name: 'Handcraft Blends Organic Castor Oil — 16 fl oz, Pure & Cold-Pressed',
    description: '100% pure cold-pressed organic castor oil for eyelashes, eyebrows, hair growth, and skin. Packed with ricinoleic acid. Use as a lash serum, brow booster, scalp treatment, or body moisturizer. Hexane-free, no additives.',
    price: 13.99, priceDisplay: '$13.99', image: '', rating: 4.6, reviewCount: 48200,
    affiliateUrl: 'https://www.amazon.com/Handcraft-Blends-Organic-Eyelashes-Eyebrows/dp/B0734849YK?tag=dailygiftshuf-20&linkCode=ll2&linkId=63869cbfe9f40224fc3bca96b1b9a295&language=en_US&ref_=as_li_ss_tl',
    asin: 'B0734849YK', recipients: ['her','mom','myself-her','friends'], budgetTier: 'under25',
    occasions: ['birthday','holiday','just-because'], tags: ['beauty','selfcare','skincare','hair'],
    status: 'published', cranes: true, createdAt: '2026-03-19T17:45:00.000Z', updatedAt: '2026-03-19T17:45:00.000Z'
  },
  {
    id: 'admin-20260319-batana-oil',
    name: 'VXHDAG Batana Oil for Hair Growth — 100% Pure, Cold-Pressed',
    description: 'Pure cold-pressed batana oil from Central American palm nuts — a centuries-old remedy for hair growth, thickness, and scalp health. Repairs damage, reduces breakage, and adds deep shine. Works on all hair types.',
    price: 19.99, priceDisplay: '$19.99', image: '', rating: 4.5, reviewCount: 2800,
    affiliateUrl: 'https://www.amazon.com/VXHDAG-Batana-Oil-Hair-Growth/dp/B0CMXF1NK3?tag=dailygiftshuf-20&linkCode=ll2&linkId=6afd97f11cc99dbe6cecef4e7e7a23d9&language=en_US&ref_=as_li_ss_tl',
    asin: 'B0CMXF1NK3', recipients: ['her','mom','myself-her','friends'], budgetTier: 'under25',
    occasions: ['birthday','holiday','just-because'], tags: ['beauty','selfcare','hair'],
    status: 'published', cranes: true, createdAt: '2026-03-19T17:45:00.000Z', updatedAt: '2026-03-19T17:45:00.000Z'
  }
];

const existingIds = new Set(newProducts.map(p => p.id));
const filtered = realArray.filter(p => !existingIds.has(p.id));
const updated = [...filtered, ...newProducts];
console.log('Final count to write:', updated.length);

// Write correctly — body is the raw array, NOT wrapped in {value:...}
const setRes = await fetch(REDIS_URL + '/set/admin:products', {
  method: 'POST',
  headers: { Authorization: 'Bearer ' + REDIS_TOKEN, 'Content-Type': 'application/json' },
  body: JSON.stringify(updated)
});
const setData = await setRes.json();
console.log('Redis write result:', setData.result);
