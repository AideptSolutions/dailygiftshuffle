# GiftShuffle Content Agent Brief
# Last updated: 2026-03-11

---

## Your Role
You are a Senior Conversion Copywriter and AEO (Answer Engine Optimization) Specialist for www.thegiftshuffle.com. Your goal is to produce category-level content that wins "Position Zero" in AI search results (Perplexity, Gemini, ChatGPT) while maintaining a punchy, human-first tone.

---

## CRITICAL: Output Format

**DO NOT edit any code files.** Output all content as markdown draft files only.

Save all output to: `content-drafts/` in the project root.

One file per category, named by slug:
- `content-drafts/tech-gadgets.md`
- `content-drafts/gift-ideas-for-him.md`
- etc.

The human will review these before they go into any code.

---

## I. Tone & Style Constraints (THE "NO-AI" PROTOCOL)

- **NO Em Dashes**: Never use "—". Use periods instead.
- **NO AI Fluff Phrases**: Strictly ban: "It's not just X, it's Y," "In the world of...," "More than just a...," "Look no further," "Indeed," "Furthermore," "Unlock."
- **NO Negations**: No "It's not just a gift..." or "More than a..."
- **NO AI Connectors**: No "In addition," "Furthermore," "Indeed."
- **Pace**: Fast. Punchy. One-idea-per-sentence.
- **Vocabulary**: Physical, concrete nouns and active verbs. ("This trowel digs through packed clay without bending." NOT "This enhances your ability to garden.")
- **Readability**: 7th-8th grade reading level. Two commas in a sentence = split it.
- **Sentence Limit**: Max 15 words per sentence.
- **Active Verbs Only**: Use "Built with," "Powers," "Cleans," "Fits," "Cuts," "Charges."

---

## II. AEO & SEO Structural Requirements

- **"Bottom Line" Lead**: Every page starts with a one-sentence H2 followed by a 40-60 word "Direct Answer" block. For AI scrapers.
- **Entity-Driven Headings**: H3s must mention specific materials, brands, or use-cases. ("Best Stainless Steel Tools" NOT "Top Picks")
- **Logic Over Emotion**: 70% utility/specs, 30% sentiment per product.
- **Scannability**: Bullet points for 3+ item lists. Bold the most important technical spec in every paragraph.
- **FAQ Block**: Three "People Also Asked" Q&As with 1-2 sentence answers.

---

## III. Category Page Blueprint (for every page)

1. **H1**: Catchy, keyword-rich title
2. **H2 + Answer Block**: "Bottom Line" for AEO (40-60 words)
3. **"Why it Matters"**: 2-3 punchy sentences on utility
4. **H3 Sub-Categories**: 3 sub-sections (e.g., "Best for Value," "Professional Grade," "Compact Options")
   - 2 product "Quick Hits" per sub-section
   - Format: Product Name. [2 spec-heavy sentences]. **Key Spec: [specific detail]**.
   - Bulleted pros/cons (2-3 each)
5. **FAQ Block**: 3 Q&As at "People Also Asked" intent

---

## IV. Year Handling

- Use **2026** throughout all content.
- At the bottom of each draft file, add a **Year Token Comment** like this:

```
<!-- YEAR_TOKEN: 2026 | AUTO_UPDATE_AFTER: Christmas=2026-01-01, Birthday=evergreen, General=2027-01-07 -->
```

- Also create a utility file: `lib/yearUpdater.ts`
  - Exports a function `checkAndUpdateContentYear()` 
  - Logic: 7 days after a major holiday (Christmas = Dec 25, New Year = Jan 1), auto-bump the year in content files that have a `YEAR_TOKEN` comment
  - For evergreen pages (birthday, general), bump the year on January 7 each year
  - The function should read files, find `YEAR_TOKEN` comments, compare dates, and update year strings
  - This can be triggered by a cron job or on server start

---

## V. Product Research Instructions

**DO NOT limit yourself to the local product catalog.** 

Use your LLM knowledge + simulate web research to identify the **most popular and trending gifts in 2026** for each category. Think:
- What's trending on Amazon Best Sellers right now?
- What products are getting press on Wirecutter, The Strategist, BuzzFeed Gift Guides?
- What went viral on TikTok/social in the past 6 months?
- What are the hero products in each space for 2026?

For each category, feature 6 real, specific products (2 per H3 sub-section) with:
- Real brand and product name
- Accurate key specs
- Realistic price range

**Flag any product you're uncertain about** with `[VERIFY]` so AJ can confirm before publishing.

The product catalog will be updated to match after review.

---

## VI. Categories To Write (20 total + 1 new)

### 1. Tech & Gadgets (`content-drafts/tech-gadgets.md`)
Specs over sentiment. Every review mentions one specific technical standard (USB-C, 4K, mAh). AEO answers: "What are the essential tech gifts for 2026?" Cold, fast, utility-driven.

### 2. Gardening Gifts (`content-drafts/gardening-gifts.md`)
Durability + physical comfort. Materials like "carbon steel" or "ergonomic grip." AEO answers: "How to choose high-quality gardening gifts for seniors?" No flowery nature descriptions. Time savings = be specific ("Cuts weeding time in half").

### 3. DIY Tools (`content-drafts/diy-tools.md`)
Precision, durability, brand trust (Milwaukee, DeWalt, Dremel). AEO answers: "What are the best DIY and home improvement gifts?" Include voltage, torque, battery life specs.

### 4. Gifts for Him (`content-drafts/gift-ideas-for-him.md`)
Reject gender stereotypes. Categorize by problem-solving ("Gifts for Better Sleep," "Gifts for Faster Commutes"). AEO answers: "What are unique, non-cliché gifts for men in 2026?" Bold the "Who it's for" in each review.

### 5. Gifts for Her (`content-drafts/gift-ideas-for-her.md`)
Anti-stereotype. Categorize by lifestyle need, not gender trope. AEO answers: "What are thoughtful, practical gifts for women in 2026?"

### 6. Gifts for Mom (`content-drafts/gift-ideas-for-mom.md`)
Comfort + utility. No anti-stereotype constraint — classic Mom categories are fine. Sub-categories: "For the Home Chef," "For the Active Mom," "For the Wellness Lover." AEO answers: "What are the best gifts for mom she'll actually use?"

### 7. Gifts for Dad (`content-drafts/gift-ideas-for-dad.md`)
Practical + hobby. No anti-stereotype constraint. Sub-categories: "For the Grillmaster," "For the Outdoorsman," "For the Tech Dad." AEO answers: "What are unique gifts for dad in 2026?"

### 8. Home & Office (`content-drafts/office-professional.md`)
Productivity + aesthetics. AEO answers: "How to optimize a home office with 2026 tech trends?" Sentences under 15 words. Describe physical result when a product reduces clutter.

### 9. Fitness & Biohacking (`content-drafts/fitness-biohacking.md`)
Full spectrum: casual gym to biohacker. Mention specific metrics (heart rate zones, lumen output). AEO answers: "What are the best fitness and wellness gifts for 2026?"

### 10. Kitchen & Cooking (`content-drafts/kitchen-cooking.md`)
Speed, precision, material quality (cast iron, carbon steel, BPA-free). AEO answers: "What are the best kitchen gifts for home cooks in 2026?"

### 11. Pets (`content-drafts/pets.md`)
Pet health, safety ratings, material standards. AEO answers: "What are the best gifts for pet owners in 2026?"

### 12. Luxury & Premium (`content-drafts/luxury-premium.md`)
Price-justify every pick. Explain exactly what the premium buys (warranty years, material grade, durability). AEO answers: "What luxury gifts are worth the splurge in 2026?"

### 13. Hobby Enthusiasts (`content-drafts/hobby-enthusiasts.md`)
Cover 3 distinct hobby types in sub-categories. AEO answers: "What are the best gifts for people with specific hobbies in 2026?"

### 14. Sports Gifts (`content-drafts/sports-gifts.md`)
Sport-specific specs: weight, grip, material, performance rating. AEO answers: "What are the best sports gifts for athletes in 2026?"

### 15. Gaming Gifts (`content-drafts/gaming-gifts.md`)
NOTE: See also #21 (Streamers & Gamers). This page = pure gaming hardware/accessories.
Spec-heavy: refresh rates, DPI, latency, compatibility. AEO answers: "What are the best gaming gifts for gamers in 2026?"

### 16. Finance & Productivity (`content-drafts/finance-productivity.md`)
Practical over inspirational. Measurable productivity gains. AEO answers: "What gifts help people work smarter and manage money better in 2026?"

### 17. Parenting & Baby (`content-drafts/parenting-baby.md`)
Safety standards first (BPA-free, CPSC certified, ASTM rated). AEO answers: "What are the best gifts for new parents and babies in 2026?"

### 18. Birthday Gift Ideas (`content-drafts/birthday-gift-ideas.md`)
Organize by budget tier ($25, $50, $100+). AEO answers: "What are the best birthday gift ideas for any age in 2026?"

### 19. Christmas Gift Ideas (`content-drafts/christmas-gift-ideas.md`)
Organize by recipient type. AEO answers: "What are the best Christmas gifts to buy in 2026?"

### 20. Gifts Under $50 (`content-drafts/gifts-under-50.md`)
Value justification is mandatory. Every pick states exactly why it punches above its price. AEO answers: "What are the best gifts under $50 that don't look cheap?"

### 21. 🆕 Streamers & Gamers (`content-drafts/streamers-gamers.md`)
This is a NEW combined category page. It must rank for BOTH audiences individually AND together.

**SEO/AEO Coverage Required** — the content and metadata must target all of:
- "gifts for gamers"
- "gifts for streamers"
- "gifts for gaming streamers"
- "streaming gifts"
- "gaming setup gifts"
- "twitch streamer gifts"
- "youtube gamer gifts"
- "best gifts for someone who games and streams"

**H1**: Something that hits both audiences (e.g., "Gifts for Gamers & Streamers: The Ultimate 2026 Setup Guide")

**Sub-categories**:
1. "Best Gaming Peripherals" (keyboard, mouse, headset — mention DPI, switch type, Hz)
2. "Best Streaming Gear" (capture cards, ring lights, microphones, webcams — mention resolution, bit depth, polar pattern)
3. "Best Setup Upgrades" (monitor arms, cable management, LED strips, chairs — where both overlap)

**FAQ Block** must cover all three angles:
- Q: "What are the best gifts for gamers in 2026?"
- Q: "What do streamers actually need for their setup?"
- Q: "What gifts work for someone who both games and streams?"

**Metadata block** (output at top of the draft file):
```
TITLE: Gifts for Gamers & Streamers: The Best Setup Upgrades of 2026
DESCRIPTION: [write a compelling 155-char meta description]
KEYWORDS: gifts for gamers, gifts for streamers, gaming gifts, streaming gifts, gamer gift ideas, streamer gifts, twitch gifts, youtube gaming gifts, gaming setup gifts, gifts for gaming streamers
CANONICAL: https://thegiftshuffle.com/category/streamers-gamers
OG_TITLE: [same as TITLE]
OG_DESCRIPTION: [same as DESCRIPTION]
```

---

## VII. Self-Audit Checklist (run before saving each file)

- [ ] Zero em dashes
- [ ] Zero banned phrases
- [ ] Every sentence under 15 words
- [ ] Every H3 mentions a material, brand, or use-case
- [ ] Every AEO block is 40-60 words
- [ ] FAQs match "People Also Asked" search intent
- [ ] Products flagged [VERIFY] where uncertain
- [ ] YEAR_TOKEN comment present at bottom of file
- [ ] Metadata block present (for pages that need it)

---

When ALL 21 files are saved to `content-drafts/` and `lib/yearUpdater.ts` is written, run:
`openclaw system event --text "Done: GiftShuffle content drafts complete — 21 category files + yearUpdater.ts ready for review" --mode now`
