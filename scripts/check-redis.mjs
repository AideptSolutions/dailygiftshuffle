const REDIS_URL = 'https://social-slug-73085.upstash.io';
const REDIS_TOKEN = 'gQAAAAAAAR19AAIncDFjYmM1MjBkYTJhODA0N2E2YTBkZTc4MDJiNzlkYmU1YnAxNzMwODU';

async function main() {
  const res = await fetch(`${REDIS_URL}/get/admin:products`, {
    headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
  });
  const json = await res.json();
  console.log('Raw result type:', typeof json.result);
  console.log('Raw result first 200 chars:', String(json.result).slice(0, 200));

  // Try parsing as the SDK would
  try {
    const parsed = JSON.parse(json.result);
    console.log('Parsed type:', typeof parsed);
    if (Array.isArray(parsed)) {
      console.log('Array length:', parsed.length);
      console.log('Last item id:', parsed[parsed.length - 1]?.id);
    } else if (typeof parsed === 'string') {
      // Double-stringified — try again
      const reparsed = JSON.parse(parsed);
      console.log('Double-stringified! Re-parsed type:', typeof reparsed);
      if (Array.isArray(reparsed)) {
        console.log('Array length:', reparsed.length);
      }
    }
  } catch (e) {
    console.error('Parse error:', e.message);
  }
}

main().catch(console.error);
