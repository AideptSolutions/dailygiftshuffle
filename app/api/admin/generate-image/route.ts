import { NextRequest, NextResponse } from 'next/server';
import { readAdminProducts, writeAdminProducts } from '@/lib/admin-store';

function checkAuth(req: NextRequest): boolean {
  return req.cookies.get('admin-auth')?.value === 'true';
}

// Try models in order — fall back if deprecated
const MODELS = [
  'gemini-3-pro-image-preview',
  'gemini-3.1-flash-image-preview',
  'gemini-2.5-flash-image',
];

async function generateImage(prompt: string, apiKey: string): Promise<string | null> {
  for (const model of MODELS) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseModalities: ['TEXT', 'IMAGE'] },
          }),
        }
      );

      if (!res.ok) continue;

      const data = await res.json();
      const parts = data?.candidates?.[0]?.content?.parts ?? [];
      const imgPart = parts.find((p: { inlineData?: { data: string; mimeType: string } }) => p.inlineData?.data);
      if (imgPart?.inlineData?.data) {
        const mime = imgPart.inlineData.mimeType || 'image/png';
        return `data:${mime};base64,${imgPart.inlineData.data}`;
      }
    } catch {
      continue;
    }
  }
  return null;
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { prompt, productId } = await req.json() as { prompt: string; productId: string };
  if (!prompt || !productId) {
    return NextResponse.json({ error: 'prompt and productId required' }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) return NextResponse.json({ error: 'GOOGLE_AI_API_KEY not set' }, { status: 500 });

  const dataUrl = await generateImage(prompt, apiKey);
  if (!dataUrl) {
    return NextResponse.json({ error: 'No image returned — all Gemini models failed or returned no image' }, { status: 502 });
  }

  // Save the data URL as the product image in Redis so it persists
  const all = await readAdminProducts();
  const idx = all.findIndex(p => p.id === productId);
  if (idx !== -1) {
    all[idx] = { ...all[idx], image: dataUrl, updatedAt: new Date().toISOString() };
    await writeAdminProducts(all);
  }

  return NextResponse.json({ imageUrl: dataUrl });
}
