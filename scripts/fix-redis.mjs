// Fix: re-store the products correctly using the raw REST API
// The data is currently double-stringified. We need to unwrap it and re-store.

const REDIS_URL = 'https://social-slug-73085.upstash.io';
const REDIS_TOKEN = 'gQAAAAAAAR19AAIncDFjYmM1MjBkYTJhODA0N2E2YTBkZTc4MDJiNzlkYmU1YnAxNzMwODU';

async function main() {
  // Step 1: Read the current (broken) data
  const getRes = await fetch(`${REDIS_URL}/get/admin:products`, {
    headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
  });
  const getJson = await getRes.json();
  
  // Unwrap the double-stringification
  let products;
  const firstParse = JSON.parse(getJson.result);
  if (typeof firstParse === 'string') {
    // Double-stringified — parse again
    products = JSON.parse(firstParse);
    console.log('Unwrapped double-stringified data');
  } else {
    products = firstParse;
    console.log('Data was already correct');
  }
  
  console.log(`Product count: ${products.length}`);
  console.log(`Last product: ${products[products.length - 1]?.id}`);

  // Step 2: Re-store correctly
  // The SDK stores values as JSON.stringify(value) — so we send the JSON string as the body value
  // For the REST API: POST /set/key with body = the value we want stored
  // We want Redis to store: JSON.stringify(products) so the SDK can JSON.parse it back
  // So we send body = JSON.stringify(products) directly (not re-encoded)
  const serialized = JSON.stringify(products);
  
  const setRes = await fetch(`${REDIS_URL}/set/admin:products`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    // Send as a JSON string value (one layer of stringify)
    body: serialized,
  });
  
  const setJson = await setRes.json();
  console.log('SET result:', setJson);

  // Step 3: Verify
  const verifyRes = await fetch(`${REDIS_URL}/get/admin:products`, {
    headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
  });
  const verifyJson = await verifyRes.json();
  const verified = JSON.parse(verifyJson.result);
  console.log('Verified type:', typeof verified, Array.isArray(verified) ? `(array, ${verified.length} items)` : '');
  console.log('Done! Site should be back up.');
}

main().catch(console.error);
