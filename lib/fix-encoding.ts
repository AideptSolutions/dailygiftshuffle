// CP1252 special mapping: byte → Unicode codepoint (for 0x80–0x9F range only)
const CP1252: Record<number, number> = {
  0x80: 0x20AC, 0x82: 0x201A, 0x83: 0x0192, 0x84: 0x201E, 0x85: 0x2026,
  0x86: 0x2020, 0x87: 0x2021, 0x88: 0x02C6, 0x89: 0x2030, 0x8A: 0x0160,
  0x8B: 0x2039, 0x8C: 0x0152, 0x8E: 0x017D, 0x91: 0x2018, 0x92: 0x2019,
  0x93: 0x201C, 0x94: 0x201D, 0x95: 0x2022, 0x96: 0x2013, 0x97: 0x2014,
  0x98: 0x02DC, 0x99: 0x2122, 0x9A: 0x0161, 0x9B: 0x203A, 0x9C: 0x0153,
  0x9E: 0x017E, 0x9F: 0x0178,
};
const CP1252_REVERSE: Record<number, number> = Object.fromEntries(
  Object.entries(CP1252).map(([b, cp]) => [cp, Number(b)])
);

function cp1252ToByte(codepoint: number): number | null {
  if (codepoint in CP1252_REVERSE) return CP1252_REVERSE[codepoint];
  if (codepoint <= 0xFF) return codepoint;
  return null;
}

function tryDecode(str: string): string | null {
  const bytes: number[] = [];
  for (const char of str) {
    const cp = char.codePointAt(0)!;
    const byte = cp1252ToByte(cp);
    if (byte === null) return null;
    bytes.push(byte);
  }
  try {
    const decoded = Buffer.from(bytes).toString('utf8');
    if (decoded.includes('\uFFFD')) return null;
    return decoded;
  } catch { return null; }
}

const MOJIBAKE_PATTERN = /[\u00C3\u00C2\u00E2\u20AC\u201C\u201D\u0192\u2018\u2019]/;

export function fixEncoding(str: string): string {
  if (!str || !MOJIBAKE_PATTERN.test(str)) return str;
  const once = tryDecode(str);
  if (!once || once === str) return str;
  // Check if double-encoded (still has mojibake markers)
  if (MOJIBAKE_PATTERN.test(once)) {
    const twice = tryDecode(once);
    if (twice && twice !== once) return twice;
  }
  return once;
}
