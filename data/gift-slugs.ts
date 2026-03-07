const recipients = [
  'him', 'her', 'mom', 'dad', 'kids',
  'teens', 'couples', 'friends', 'baby', 'coworker', 'employees',
  'grandparents', 'myself',
] as const;

const occasions = [
  'birthday', 'christmas', 'anniversary', 'graduation',
  'mothers-day', 'fathers-day', 'valentines', 'just-because',
  'housewarming', 'wedding', 'baby-shower', 'easter',
  'halloween', 'thanksgiving', 'new-year', 'retirement',
] as const;

const budgets = ['under-25', 'under-50', 'under-100', 'over-100'] as const;

const slugs: string[] = [];

// Pattern 1: best-gifts-for-{recipient}-{occasion} = 10 × 16 = 160
for (const r of recipients) {
  for (const o of occasions) {
    slugs.push(`best-gifts-for-${r}-${o}`);
  }
}

// Pattern 2: gift-ideas-for-{recipient}-{budget} = 10 × 4 = 40
for (const r of recipients) {
  for (const b of budgets) {
    slugs.push(`gift-ideas-for-${r}-${b}`);
  }
}

// Pattern 3: unique-gifts-for-{recipient}-{occasion} = 10 × 16 = 160
for (const r of recipients) {
  for (const o of occasions) {
    slugs.push(`unique-gifts-for-${r}-${o}`);
  }
}

// Pattern 4: thoughtful-gifts-for-{recipient}-{occasion} first 14 occasions × 10 = 140
const occasions14 = occasions.slice(0, 14) as readonly string[];
for (const r of recipients) {
  for (const o of occasions14) {
    slugs.push(`thoughtful-gifts-for-${r}-${o}`);
  }
}

// Exactly 500 slugs: 160 + 40 + 160 + 140 = 500
export const giftSlugs: string[] = slugs;
export default giftSlugs;
