import { NextRequest, NextResponse } from 'next/server';
import { readAdminProducts, writeAdminProducts } from '@/lib/admin-store';
import fs from 'fs/promises';
import path from 'path';

function checkAuth(req: NextRequest): boolean {
  return req.cookies.get('admin-auth')?.value === 'true';
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { prompt, productId } = await req.json() as { prompt: string; productId: string };
  if (!prompt || !productId) {
    return NextResponse.json({ error: 'prompt and productId required' }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) return NextResponse.json({ error: 'GOOGLE_AI_API_KEY not set' }, { status: 500 });

  const geminiRes = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-preview-image-generation:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseModalities: ['TEXT', 'IMAGE'] },
      }),
    }
  );

  if (!geminiRes.ok) {
    const errText = await geminiRes.text();
    return NextResponse.json({ error: 'Gemini API error', details: errText }, { status: 502 });
  }

  const geminiData = await geminiRes.json();
  const parts = geminiData?.candidates?.[0]?.content?.parts ?? [];
  const imagePart = parts.find((p: { inlineData?: { data: string; mimeType: string } }) => p.inlineData?.data);
  if (!imagePart) {
    return NextResponse.json({ error: 'No image returned by Gemini' }, { status: 502 });
  }

  const base64Data = imagePart.inlineData.data;
  const imageBuffer = Buffer.from(base64Data, 'base64');

  const productsDir = path.join(process.cwd(), 'public', 'img', 'products');
  await fs.mkdir(productsDir, { recursive: true });
  const filename = `${productId}.jpg`;
  await fs.writeFile(path.join(productsDir, filename), imageBuffer);

  const imageUrl = `/img/products/${filename}`;

  // Update product image in store
  const all = await readAdminProducts();
  const idx = all.findIndex(p => p.id === productId);
  if (idx !== -1) {
    all[idx] = { ...all[idx], image: imageUrl, updatedAt: new Date().toISOString() };
    await writeAdminProducts(all);
  }

  return NextResponse.json({ imageUrl });
}
