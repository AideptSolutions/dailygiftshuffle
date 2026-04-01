// Extract ASINs from the broken products and fetch titles via Amazon product pages
const badProducts = [
  { id: 'admin-1773605286646-l6pwi', asin: 'B0DR9Q4HJG', tags: 'fitness' },
  { id: 'admin-1773606061346-nzls6', asin: 'B07S1BNNYD', tags: 'fitness, sports' },
  { id: 'admin-1773606176926-2pqrh', asin: 'B00V5Y9P5G', tags: 'parenting, kids' },
  { id: 'admin-1773606196376-6o0tb', asin: 'B000CBSNRY', tags: 'parenting, kids' },
  { id: 'admin-1773606312567-tfsi0', asin: 'B072B9V2KB', tags: 'parenting, kids' },
  { id: 'admin-1773606375622-sq549', asin: 'B082KFTF41', tags: 'parenting, kids' },
  { id: 'admin-1773606530349-1v352', asin: 'B00006JZCG', tags: 'parenting, kids' },
  { id: 'admin-1773606546334-6hkyf', asin: 'B0CYT85XT6', tags: 'parenting, kids' },
  { id: 'admin-1773606603273-ezeua', asin: 'B0CSDSYR5K', tags: 'parenting, kids' },
  { id: 'admin-1773606616807-klpj3', asin: 'B0F3XF1SH8', tags: 'parenting, kids' },
  { id: 'admin-1773606640220-dnf28', asin: 'B0DHPT6ZXK', tags: 'parenting, kids' },
  { id: 'admin-1773606749292-zqhg6', asin: 'B0BWDWNH5G', tags: 'parenting, kids' },
  { id: 'admin-1773607292788-ww0ro', asin: 'B0FBC31SFR', tags: 'home, office, luxury, hobby' },
  { id: 'admin-1773607360768-s4gkg', asin: 'B0FBBV27FC', tags: 'home, office, kitchen' },
  { id: 'admin-1773607404668-iun8l', asin: 'B0FN5NY3TB', tags: 'home, office, kitchen, tech, luxury' },
  { id: 'admin-1773607432989-siuqa', asin: 'B0865LF8BY', tags: 'home, office, kitchen, luxury' },
  { id: 'admin-1773607469081-t9ch1', asin: 'B002WJI54U', tags: 'home, office, luxury' },
  { id: 'admin-1773607624962-n7kqg', asin: 'B0CSLHL3MG', tags: 'home, office' },
  { id: 'admin-1773607718050-i5abw', asin: 'B0BYJSZ3TH', tags: 'home, office, luxury, kitchen' },
  { id: 'admin-1773607756775-cvkca', asin: 'B09C154HVX', tags: 'home, office, luxury, kitchen' },
  { id: 'admin-1773607853479-4px3s', asin: 'B09BDL522H', tags: 'home, office, gaming, tech' },
  { id: 'admin-1773607988631-pswcs', asin: 'B0CN6NDMQ5', tags: 'home, office, luxury, kitchen' },
  { id: 'admin-1773608042407-ud7rm', asin: 'B09BDLV9BV', tags: 'home, office, tech' },
  { id: 'admin-1773608087879-auoa3', asin: 'B0CMVBLH36', tags: 'home, office, kitchen' },
  { id: 'admin-1773608132295-fqqwf', asin: 'B09WMPDVZX', tags: 'home, office, kitchen, luxury' },
  { id: 'admin-1773608184402-ffohw', asin: 'B0B9T2LW6R', tags: 'home, office, tech' },
  { id: 'admin-1773608259221-aq2e0', asin: 'B005IDC31S', tags: 'home, office, luxury' },
  { id: 'admin-1773608357786-89qa7', asin: 'B09P2YTJF6', tags: 'home, office, kitchen, luxury' },
  { id: 'admin-1773608539684-dj67h', asin: 'B09MJR9T2P', tags: 'gaming, tech' },
  { id: 'admin-1773608555522-y69bi', asin: 'B0CD15C641', tags: 'gaming, tech' },
  { id: 'admin-1773608616982-va4k5', asin: 'B0FTQ5RJM7', tags: 'gaming, tech, hobby' },
  { id: 'admin-1773608677969-39fd0', asin: 'B0DB6S6R89', tags: 'gaming, tech, hobby' },
  { id: 'admin-1773608696241-81xgn', asin: 'B0CYWFH5Y9', tags: 'gaming, tech, hobby' },
  { id: 'admin-1773608746836-sg60n', asin: 'B09NBWL8J5', tags: 'gaming, tech, luxury' },
  { id: 'admin-1773613349327-98e4d', asin: 'B08SBYHYJV', tags: 'fitness' },
];

async function getTitle(asin) {
  try {
    const url = `https://www.amazon.com/dp/${asin}`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept': 'text/html',
      },
      signal: AbortSignal.timeout(8000),
    });
    const html = await res.text();
    const match = html.match(/<span id="productTitle"[^>]*>([^<]+)<\/span>/) ||
                  html.match(/<title>([^<|]+)/);
    return match ? match[1].trim().replace(/\s+/g, ' ') : '(could not fetch)';
  } catch {
    return '(fetch failed)';
  }
}

async function run() {
  console.log('Looking up', badProducts.length, 'ASINs...\n');
  for (const p of badProducts) {
    const title = await getTitle(p.asin);
    console.log(`ASIN ${p.asin} [${p.tags}]`);
    console.log(`  → ${title}`);
    console.log();
    await new Promise(r => setTimeout(r, 500)); // be gentle with Amazon
  }
}

run();
