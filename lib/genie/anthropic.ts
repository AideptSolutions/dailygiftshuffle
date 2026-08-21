// Claude Haiku 4.5 implementation of the Genie brain, via the official SDK.
// Structured output (output_config.format json_schema) guarantees parseable
// JSON matching GENIE_SCHEMA; the validator still owns "exactly 5" and ranges.

import Anthropic from '@anthropic-ai/sdk';
import { SYSTEM_PROMPT, GENIE_SCHEMA } from '@/lib/genie/prompt';
import type { GenieInput, GenieProvider, GenieRawOutput } from '@/lib/genie/provider';

export function anthropicProvider(model: string): GenieProvider {
  return {
    name: `anthropic:${model}`,
    async generate(input: GenieInput): Promise<GenieRawOutput> {
      if (!process.env.ANTHROPIC_API_KEY) {
        throw new Error('ANTHROPIC_API_KEY is not configured');
      }
      const client = new Anthropic();
      const response = await client.messages.create({
        model,
        max_tokens: 2000,
        system: SYSTEM_PROMPT,
        messages: [
          { role: 'user', content: `${input.catalogBlock}\n\n${input.quizBlock}` },
        ],
        output_config: {
          format: {
            type: 'json_schema',
            schema: GENIE_SCHEMA as unknown as Record<string, unknown>,
          },
        },
      });
      const text = response.content.find((b) => b.type === 'text');
      if (!text || text.type !== 'text') {
        throw new Error(`No text block in response (stop_reason: ${response.stop_reason})`);
      }
      return JSON.parse(text.text) as GenieRawOutput;
    },
  };
}
