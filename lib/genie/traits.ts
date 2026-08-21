// Personality traits for the "how would you describe them?" quiz question
// (check all that apply). One list drives everything: the panel renders it,
// the run route validates against it, the pre-filter boosts the mapped catalog
// tags, and the model reads the labels to sharpen its profile + picks. Traits
// with no tags still help: the model uses them even when the catalog cannot.

export interface Trait {
  value: string;
  label: string;
  // Catalog NicheTags this trait should boost in the candidate pre-filter.
  tags: string[];
}

export const TRAITS: Trait[] = [
  { value: 'outdoorsy',   label: 'Outdoorsy',        tags: ['outdoors', 'gardening'] },
  { value: 'sporty',      label: 'Sporty',           tags: ['sports', 'fitness'] },
  { value: 'fancy',       label: 'Fancy',            tags: ['luxury', 'beauty'] },
  { value: 'rugged',      label: 'Rugged',           tags: ['diy-tools', 'car-accessories'] },
  { value: 'techy',       label: 'Techy',            tags: ['tech', 'ai-smart-home'] },
  { value: 'gamer',       label: 'Gamer',            tags: ['gaming'] },
  { value: 'homebody',    label: 'Homebody',         tags: ['home', 'kitchen'] },
  { value: 'foodie',      label: 'Foodie',           tags: ['kitchen'] },
  { value: 'creative',    label: 'Creative',         tags: ['hobby'] },
  { value: 'wellness',    label: 'Into self-care',   tags: ['beauty', 'fitness'] },
  { value: 'traveler',    label: 'Traveler',         tags: ['travel'] },
  { value: 'pet-parent',  label: 'Pet parent',       tags: ['pets'] },
  { value: 'funny',       label: 'Loves a laugh',    tags: [] },
  { value: 'sentimental', label: 'Sentimental',      tags: [] },
];

export const MAX_TRAITS = 6;

const byValue = new Map(TRAITS.map((t) => [t.value, t]));

// Validate an untrusted list down to known trait values (deduped, capped).
export function sanitizeTraits(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  const out: string[] = [];
  for (const item of v) {
    if (typeof item === 'string' && byValue.has(item) && !out.includes(item)) {
      out.push(item);
      if (out.length >= MAX_TRAITS) break;
    }
  }
  return out;
}

export function traitLabels(values: string[]): string[] {
  return values.map((v) => byValue.get(v)?.label ?? v);
}

export function traitTags(values: string[]): Set<string> {
  const tags = new Set<string>();
  for (const v of values) for (const t of byValue.get(v)?.tags ?? []) tags.add(t);
  return tags;
}
