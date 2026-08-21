// Gemini Flash fallback for the Genie brain, via raw fetch (same zero-SDK
// pattern as app/api/admin/generate-image/route.ts). Selected by setting
// GENIE_MODEL=gemini-2.5-flash (or a newer flash id) in the environment.

import { SYSTEM_PROMPT, GENIE_SCHEMA_GEMINI } from '@/lib/genie/prompt';
import type { GenieInput, GenieProvider, GenieRawOutput } from '@/lib/genie/provider';

export function geminiProvider(model: string): GenieProvider {
  return {
    name: `gemini:${model}`,
    async generate(input: GenieInput): Promise<GenieRawOutput> {
      const apiKey = process.env.GOOGLE_AI_API_KEY;
      if (!apiKey) throw new Error('GOOGLE_AI_API_KEY is not configured');

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
            contents: [
              { role: 'user', parts: [{ text: `${input.catalogBlock}\n\n${input.quizBlock}` }] },
            ],
            generationConfig: {
              responseMimeType: 'application/json',
              responseSchema: GENIE_SCHEMA_GEMINI,
              maxOutputTokens: 2000,
            },
          }),
        },
      );
      if (!res.ok) {
        throw new Error(`Gemini request failed: HTTP ${res.status}`);
      }
      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.find(
        (p: { text?: string }) => typeof p.text === 'string',
      )?.text;
      if (!text) throw new Error('Gemini returned no text part');
      return JSON.parse(text) as GenieRawOutput;
    },
  };
}
