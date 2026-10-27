# Visuals Plan (2026-10-26)

Audit of where the site goes text-only, plus image prompts for each new
visual. Copy-paste prompt list: IMAGE-PROMPTS.md.

## Status (2026-10-26): image work SHIPPED

The owner generated all 20 images (sources were PNG at 1254px squares,
1536x1024 wides, 1672x941 hero). Every image was visually audited (no text,
logos or people; transparency real on the 5 cutouts), then converted:
photos to JPG q80 (recipient tiles 512px, wides 1200-1672px), cutouts to
WebP with alpha at 512px. Where the owner saved extra variants, the picks
were: hero = first variant (calmest center), streamers = mic/ring-light
version (reads as "streamer" fastest at tile size).

Implemented:
- /shuffle: all 18 Unsplash headshots replaced (8 existing recipient
  images + 10 new); tile crop changed from object-top (faces) to centered,
  and next/image optimization re-enabled (was `unoptimized` for the remote
  host).
- /category: 16 Unsplash photos swapped to existing
  public/img/category-heroes/{slug}.jpg (stale stock-photo alt text dropped).
- Homepage: hero backdrop behind the headline block only (fades to white
  before the featured section); How It Works step photos with coral number
  badges; closing CTA rebuilt as a capped-width rounded card so the gift
  rows stay visible (at full bleed on wide screens, cover-cropping left only
  plain coral); Graduation card removed so the guide grid is an even 12 (it
  also reused the Birthday photo).
- GiftGuideTemplate mid-page CTA: two-column with the shell-game image
  (reaches every template guide).
- About (image after the selection criteria), wishlist empty state, blog
  inline figure in "Why the pins matter so much".
- New app/not-found.tsx (noindex, image, Shuffle button, 6 popular links).

Found and fixed on the way: /shuffle budget labels used en dashes between
the prices in visible UI (5 labels); now "$25 to $50" style, with a plain
hyphen in the one compact sublabel.

Deliberately NOT done:
- Unsplash stays in next.config.mjs remotePatterns. No repo code uses it
  anymore, but admin-added products live in Redis and cannot be grepped; an
  admin product pointing at Unsplash would break silently if removed.
- (Done in a follow-up the same day, see below.)

Follow-up 2026-10-26: homepage feature boxes got custom line icons
(components/FeatureIcon.tsx: gift tag with heart, stopwatch, bag with
check; same 24px / 1.75 stroke / currentColor system as CategoryIcon, in a
coral-tint tile). GiftGuideTemplate "More Gift Guides" pills became image
cards: lib/guideImages.ts resolves each link's art at build time (guide
hero by slug, category art for /category/*, 10 explicit overrides for
guides whose hero is named differently) and falls back to a tinted text
card rather than a broken image. Build check: all 354 cards across the
template guides resolved to an image.

Deploy note: the first version of lib/guideImages.ts probed public/ with
fs; Vercel's file tracer then bundled the whole image folder into every
function (528MB vs 250MB) and deploy 795fb09 failed (prod kept serving the
previous build). Fixed in 5b2ac5f with a prebuild manifest
(scripts/gen-guide-image-manifest.mjs -> lib/guideImageManifest.json).

Legacy pages (2026-10-26): the card grid moved into
components/GuideLinkCards.tsx (used by GiftGuideTemplate too), and the 41
legacy guide pages' inline pill blocks ("Related Gift Guides", "More Gift
Guides", "More [occasion] Gift Guides") were converted to it by script,
keeping each page's own link list unchanged. Links without art show the
coral gift icon; "Home" uses the homepage hero backdrop. Build check: 89
pages, 578 cards, 578 with a photo, 0 public/ files traced into any
function. Left as pills on purpose: /category/[niche] "Browse Other
Categories" and /shuffle/[category] (category navigation, not guide links).

Verification lesson: the in-app browser pane, while hidden, returns blank
screenshots for any scrolled position (top-of-page captures work). This
looked like a rendering bug caused by the new hero image and was not.
Reliable full-page check: headless Edge with a tall window and a fresh
--user-data-dir per capture (msedge --headless=new --window-size=1366,6400
--screenshot=...). Headless Edge will not lay out narrower than ~500px, so
phone width must be checked with the pane's mobile preset at scroll 0.

## What the audit found

Outside of hero photos and product tiles, almost every section is type on a
flat color band. The worst stretches:

| Page | Text-only stretch |
|---|---|
| Homepage | Hero (centered type on white), How It Works (numbered circles), the 3 feature boxes, closing coral CTA band |
| Guide template (41+ guides) | Intro and answer box, "Still not sure?" mid-page CTA, long FAQ, "More Gift Guides" pill links |
| /shuffle | Recipient tiles are **hotlinked Unsplash stock headshots of strangers** (one, "For Him", failed to load during the audit). Strongest template-site tell on the site, and it clashes with the homepage's own flat-lay recipient tiles |
| /category | 16 more hotlinked Unsplash stock photos |
| About | One long column of text |
| Wishlist | Empty state is a plain white card |
| 404 | No `app/not-found.tsx`: the bare Next.js default, barely readable on the light background |
| Blog | Articles are text-only after the cover image |

Small layout bug spotted on the way: the homepage "Popular Gift Guides" grid
has 13 cards in a 4-column grid, so Graduation sits alone on the last row.

## Fixes that need no new images

1. **/category index:** swap all 16 Unsplash URLs in `app/category/page.tsx`
   for the existing on-brand art in `public/img/category-heroes/{slug}.jpg`.
   All 16 slugs already have a file there.
2. **/shuffle tiles:** 8 of the 18 tiles (her, him, mom, dad, kids, teens,
   friends, couples) can switch to the existing `public/images/recipients/*.jpg`
   today. The other 10 need new images (prompts below).
3. **Guide "More Gift Guides" pills:** turn them into small image cards using
   the existing hero image of each linked guide (nearly every guide has one in
   `public/images/heroes/`).
4. **Homepage feature boxes** (Personalized, Instant, Ready to Buy): custom
   inline SVG line icons in coral (custom-icons skill), not photos. Small boxes
   read better with icons.
5. **Homepage cup animation:** keep it, it is the most distinctive thing on
   the page, but give it more size and a surface to sit on (see hero backdrop).
6. After 1 and 2, remove the Unsplash entry from `next.config.mjs` remote
   patterns so no third-party image host remains.

## House style (applies to every prompt below)

Matches the existing recipient tiles and heroes: overhead flat-lay
photography, soft natural daylight, gentle shadows, warm cream linen or
paper surfaces, coral used in the background and ribbon only, products in
their true colors, no text, no logos, no people, no hands. Every prompt below
already includes this, so each one is copy-paste ready for
`scripts/gen-image.mjs`.

Sizes: square tiles `--size 1024x1024 --resize 512x512`; wide backdrops
`--size 1536x1024`; isolated objects `--size 1024x1024 --transparent`.

---

## 1. Homepage hero backdrop (1 image, 1536x1024)

Placement: behind the headline, desktop only. The center must stay empty for
the headline and cup animation. On phones, show a cropped strip of one edge
under the Shuffle button instead.

**A.** Wide overhead flat-lay photograph on warm cream linen. Gifts are arranged only along the far left and far right edges, partially cropped by the frame: wrapped boxes in kraft paper and muted coral paper, a spool of coral satin ribbon, a small potted succulent, a leather notebook, a glass candle. The entire center half of the image is empty cream linen with soft fabric texture, left clear for a headline. Soft natural daylight from the upper left, gentle shadows. No text, no logos, no people.

**B.** Wide overhead photograph of a tabletop split diagonally between muted coral paper and warm cream paper. Small clusters of gifts sit only in the top-left and bottom-right corners: a wrapped box with a cream bow, a ceramic mug, wireless earbuds, a folded knit scarf. A long coral satin ribbon curls loosely from one cluster toward the other. The middle of the frame is clean, empty paper. Soft daylight, true product colors, editorial product photography. No text, no logos, no people.

**C.** Wide overhead flat-lay on cream linen showing gifts mid-unwrap along the left and right edges only: torn kraft paper, crinkled cream tissue, a half-opened box revealing a watch, curls of coral ribbon, a few small paper confetti dots. Everything thins out toward the center, which is calm, empty linen with soft texture. Warm natural light, gentle shadows. No text, no logos, no people.

## 2. /shuffle recipient tiles (10 images, 1024x1024)

Placement: replaces the Unsplash headshots. Must match the existing
`public/images/recipients/*.jpg` set: diagonal coral and cream split with a
coral ribbon.

### For Brother
**A.** Square overhead flat-lay. Background split diagonally from top-left to bottom-right between muted coral paper and warm cream paper, a coral satin ribbon curling in one corner. Objects: a folded heather-gray hoodie, a matte black wireless game controller, a compact bluetooth speaker, a small stack of playing cards. Soft daylight, true colors. No text, no logos, no people.

**B.** Square overhead flat-lay on a diagonal muted coral and cream paper split with a coral ribbon in the lower corner. Objects: wireless earbuds in an open white case, a stainless insulated water bottle, a pair of crew socks rolled up, a smartwatch with a black band. Soft natural light, gentle shadows. No text, no logos, no people.

**C.** Square overhead flat-lay, diagonal coral and cream paper background, coral satin ribbon. Objects: a beanie, a leather keychain, a pack of beef jerky in plain kraft packaging, a small puzzle cube. Clean spacing, soft daylight, true product colors. No text, no logos, no people.

### For Sister
**A.** Square overhead flat-lay, background split diagonally between muted coral paper and warm cream paper, a coral satin ribbon curling in one corner. Objects: a trio of round lip balms, two silk scrunchies, a paperback with a plain blank cover, a pastel iced-coffee tumbler. Soft daylight, true colors. No text, no logos, no people.

**B.** Square overhead flat-lay on a diagonal coral and cream paper split with a coral ribbon. Objects: a small glass perfume bottle without a label, gold hoop earrings, a mint-colored instant camera, a phone case with a simple floral pattern. Soft natural light, gentle shadows. No text, no logos, no people.

**C.** Square overhead flat-lay, diagonal muted coral and cream paper background, coral satin ribbon. Objects: fuzzy cream socks, a plain sheet-mask pouch, a small glass candle, a few tortoiseshell hair clips. Cozy, airy arrangement, soft daylight. No text, no logos, no people.

### For Baby
**A.** Square overhead flat-lay, background split diagonally between soft muted coral paper and warm cream paper, a coral satin ribbon curling in one corner. Objects: a folded cream muslin swaddle, tiny knit booties, a natural wooden teether ring, a soft bunny plush. Gentle daylight, soft shadows. No text, no logos, no people.

**B.** Square overhead flat-lay on a diagonal coral and cream paper split with a coral ribbon. Objects: wooden stacking rings, a small board book with a plain blank cover, a linen bib, a wooden rattle. Soft natural light, calm spacing. No text, no logos, no people.

**C.** Square overhead flat-lay, diagonal muted coral and cream paper background, coral satin ribbon. Objects: a tiny knit hat, a plush lamb, a silicone pacifier, a set of blank cream milestone cards. Soft daylight, true colors. No text, no logos, no people.

### For Pets
**A.** Square overhead flat-lay, background split diagonally between muted coral paper and warm cream paper, a coral satin ribbon curling in one corner. Objects: a coiled leather dog leash, a tennis ball, a bone-shaped biscuit, a collar with a blank brass tag. Soft daylight, true colors. No text, no logos, no people, no animals.

**B.** Square overhead flat-lay on a diagonal coral and cream paper split with a coral ribbon. Objects: a feather wand cat toy, a small felt mouse toy, a speckled ceramic pet bowl, a ball of yarn. Soft natural light, gentle shadows. No text, no logos, no people, no animals.

**C.** Square overhead flat-lay, diagonal muted coral and cream paper background, coral satin ribbon. Objects: a braided rope tug toy, a plush squeaky toy shaped like a carrot, a folded gingham pet bandana, a jar of treats with a plain lid. Soft daylight. No text, no logos, no people, no animals.

### For Coworker
**A.** Square overhead flat-lay, background split diagonally between muted coral paper and warm cream paper, a coral satin ribbon curling in one corner. Objects: a ceramic desk mug, a blank pad of sticky notes, a weighty metal pen, a tiny succulent in a concrete pot. Soft daylight, true colors. No text, no logos, no people.

**B.** Square overhead flat-lay on a diagonal coral and cream paper split with a coral ribbon. Objects: a slim wireless charging pad, a bag of coffee beans in plain kraft packaging, a linen-covered notebook, a small brass desk clip. Soft natural light. No text, no logos, no people.

**C.** Square overhead flat-lay, diagonal muted coral and cream paper background, coral satin ribbon. Objects: a small tin of loose-leaf tea with a plain lid, a box of wrapped chocolates without branding, a felt desk coaster, a mini desk plant. Soft daylight. No text, no logos, no people.

### For Employees (team gifts)
**A.** Square overhead flat-lay, background split diagonally between muted coral paper and warm cream paper, a coral satin ribbon running along the split. Objects: a neat row of five identical cream insulated tumblers, each with a small coral bow. Orderly, repeated arrangement that reads as a team set. Soft daylight. No text, no logos, no people.

**B.** Square overhead flat-lay on a diagonal coral and cream paper split. Objects: a grid of six identical small kraft gift boxes tied with coral ribbon, one lid lifted to show cream tissue inside. Soft natural light, gentle shadows. No text, no logos, no people.

**C.** Square overhead flat-lay, diagonal muted coral and cream paper background, coral satin ribbon. Objects: a woven gift basket holding shareable snacks in plain packaging, with four matching notebooks fanned beside it. Soft daylight. No text, no logos, no people.

### For Grandparents
**A.** Square overhead flat-lay, background split diagonally between muted coral paper and warm cream paper, a coral satin ribbon curling in one corner. Objects: a wooden picture frame holding a soft-focus landscape photo, folded reading glasses, a cream cable-knit cardigan sleeve, a china teacup on a saucer. Warm daylight. No text, no logos, no people.

**B.** Square overhead flat-lay on a diagonal coral and cream paper split with a coral ribbon. Objects: loose jigsaw puzzle pieces showing a meadow, a folded plaid throw, a small jar of honey with a wooden dipper. Soft natural light, gentle shadows. No text, no logos, no people.

**C.** Square overhead flat-lay, diagonal muted coral and cream paper background, coral satin ribbon. Objects: canvas gardening gloves, three blank seed packets, a small copper watering can, a sprig of rosemary. Soft daylight, true colors. No text, no logos, no people.

### Streamers
**A.** Square overhead flat-lay, background split diagonally between muted coral paper and warm cream paper, a coral satin ribbon curling in one corner. Objects: a black podcast-style microphone on a short stand, over-ear headphones, a compact keyboard with a soft warm backlight, a small round ring light. True colors. No text, no logos, no people.

**B.** Square overhead flat-lay on a diagonal coral and cream paper split with a coral ribbon. Objects: a compact webcam, a small control pad with blank square buttons, a coiled LED light strip glowing warm white, a gaming mouse. Soft daylight. No text, no logos, no people.

**C.** Square overhead flat-lay, diagonal muted coral and cream paper background, coral satin ribbon. Objects: a gaming headset with a boom mic, a phone tripod, a matte black stream deck-style pad with blank keys, a cable organizer. Soft daylight. No text, no logos, no people.

### Me (for her, self-gifting)
**A.** Square overhead flat-lay, background split diagonally between muted coral paper and warm cream paper, a coral satin ribbon curling in one corner. Objects: a silk sleep mask, a glass serum dropper bottle without a label, a fine gold chain necklace, a linen-covered journal. Soft daylight. No text, no logos, no people.

**B.** Square overhead flat-lay on a diagonal coral and cream paper split with a coral ribbon. Objects: a round bath bomb, the folded collar of a waffle robe, a glass candle, a paperback with a plain blank cover. Soft natural light. No text, no logos, no people.

**C.** Square overhead flat-lay, diagonal muted coral and cream paper background, coral satin ribbon. Objects: a small structured leather handbag corner, tortoiseshell sunglasses, a clear lip gloss tube, a single fresh peony. Soft daylight. No text, no logos, no people.

### Me (for him, self-gifting)
**A.** Square overhead flat-lay, background split diagonally between muted coral paper and warm cream paper, a coral satin ribbon curling in one corner. Objects: premium over-ear headphones, a heavy rocks glass with one large ice cube, a steel watch on a brown leather strap. Soft daylight. No text, no logos, no people.

**B.** Square overhead flat-lay on a diagonal coral and cream paper split with a coral ribbon. Objects: a dark glass cologne bottle without a label, a slim leather wallet, a pair of white leather sneakers seen from above. Soft natural light. No text, no logos, no people.

**C.** Square overhead flat-lay, diagonal muted coral and cream paper background, coral satin ribbon. Objects: a small espresso cup on a saucer, wireless earbuds, a hardcover book with a plain blank cover, a fountain pen. Soft daylight. No text, no logos, no people.

## 3. Homepage "How It Works" steps (3 images, 1024x1024, transparent)

Placement: replaces the numbered circles; keep the numbers as small coral
badges on each image. Isolated objects on transparent backgrounds so they sit
on the existing peach band.

### Step 1: Pick a recipient
**A.** A single small gift box wrapped in cream paper with a coral satin bow, a blank kraft gift tag tied to it with coral string. Isolated on a transparent background, three-quarter view, soft studio light, gentle contact shadow. Photographic, true colors. No text, no logos.

**B.** Three blank kraft gift tags fanned out like playing cards, each tied with a short loop of coral string. Isolated on a transparent background, soft studio light, gentle shadow. Photographic. No text, no logos.

**C.** A small stack of two wrapped gifts, one in muted coral paper and one in cream paper, with a blank tag hanging from the top bow. Isolated on a transparent background, three-quarter view, soft light. No text, no logos.

### Step 2: Set your budget
**A.** A glossy coral ceramic piggy bank with three gold coins stacked beside it. Isolated on a transparent background, three-quarter view, soft studio light, gentle contact shadow. Photographic. No text, no logos.

**B.** A blank coral price tag on a cream string lying beside a short stack of gold coins. Isolated on a transparent background, soft studio light. Photographic, true colors. No text, no numbers, no logos.

**C.** A slim tan leather wallet, slightly open, with the edge of a plain cream card peeking out. Isolated on a transparent background, three-quarter view, soft light. No text, no logos, no currency details.

### Step 3: Hit shuffle
**A.** A glossy red plastic party cup tipped on its side, with a small wrapped gift box in cream paper and a coral bow tumbling out of it. Isolated on a transparent background, three-quarter view, soft studio light, slight motion. Photographic. No text, no logos.

**B.** An open cream gift box with crinkled tissue paper bursting upward and a few small coral paper confetti pieces in the air. Isolated on a transparent background, soft studio light. Photographic. No text, no logos.

**C.** Three glossy red party cups upside down in a row, the middle one lifted slightly to reveal a small coral-wrapped gift underneath. Isolated on a transparent background, three-quarter view, soft light. No text, no logos.

Note: A and C deliberately echo the hero cup animation so the "shuffle"
idea reads the same way across the page.

## 4. Homepage closing CTA band (1 image, 1536x1024)

Placement: background of the coral "Ready to find the perfect gift?" band.
The center third must stay solid coral for the white headline and button.

**A.** Wide overhead photograph of a vivid coral paper backdrop. Wrapped gift boxes in cream and white paper with coral ribbons enter from the top and bottom edges, partly out of frame. The center third is clean, solid coral paper with nothing in it. Soft daylight, gentle shadows. No text, no logos, no people.

**B.** Wide overhead photograph of a seamless coral backdrop with long curls of cream satin ribbon and small scattered cream confetti dots around the outer edges only, thinning to a completely clear coral center. Soft even light. No text, no logos, no people.

**C.** Wide photograph of a coral tabletop lit by low window light, with three large gift boxes in cream paper placed at the far left and far right, casting long soft shadows toward the empty coral center. No text, no logos, no people.

## 5. Guide template mid-page CTA (1 shared image, 1536x1024)

Placement: beside the "Still not sure what she would love?" block on every
guide built on GiftGuideTemplate (41+ pages). One image covers them all.

**A.** Overhead photograph on warm cream linen: three glossy red party cups upside down in a row, the middle cup lifted and resting on its side to reveal a small gift wrapped in muted coral paper with a cream bow. Soft daylight, gentle shadows, lots of calm empty linen around the scene. No text, no logos, no people.

**B.** Three-quarter photograph of a cream tabletop with a single small gift box in muted coral paper, its lid lifted slightly, tissue paper peeking out, a few blank kraft tags scattered nearby. Shallow depth of field, warm natural light. No text, no logos, no people.

**C.** Overhead flat-lay on a diagonal muted coral and cream paper split: a neat row of four small wrapped gifts, with one lifted slightly higher and tied with a brighter coral ribbon as the clear pick. Soft daylight. No text, no logos, no people.

## 6. About page (1 image, 1536x1024)

Placement: under "Editorial Policy", illustrating the hand-picked process.

**A.** Overhead photograph of a tidy work desk on warm cream linen: a magnifying glass resting on a small product box, a printed card showing only five gold stars, a coral pen, and three gift candidates lined up side by side for comparison, one tied with a coral ribbon as the winner. Soft daylight. No readable text, no logos, no people.

**B.** Overhead flat-lay of a clipboard holding a sheet with a column of coral check marks and no readable words, surrounded by four everyday gift products: a candle, a mug, earbuds and a notebook. Diagonal muted coral and cream paper background. Soft daylight. No readable text, no logos, no people.

**C.** Overhead photograph of two tidy groups on cream linen: on the left a small set of wrapped gifts with coral bows, on the right a few unwrapped products set aside, with a coral ribbon dividing the two groups. Calm, editorial composition, soft light. No text, no logos, no people.

## 7. Wishlist empty state (1 image, 1024x1024, transparent)

**A.** An open, empty cream gift box with crisp tissue paper folded neatly inside, its lid leaning against the side, a loose coral satin ribbon draped over the edge. Isolated on a transparent background, three-quarter view, soft studio light, gentle shadow. Photographic. No text, no logos.

**B.** A small empty woven basket lined with cream fabric, a coral ribbon tied in a bow on the handle. Isolated on a transparent background, soft light, gentle shadow. Photographic. No text, no logos.

**C.** A single blank kraft gift tag on a coral string, lying beside an untied coral ribbon curled in a loose spiral. Isolated on a transparent background, soft studio light. Photographic. No text, no logos.

## 8. Custom 404 page (1 image, 1024x1024, transparent)

Needs a new `app/not-found.tsx` (none exists) with this image, a short line
("This one came up empty") and links to Shuffle and the guides.

**A.** A glossy red party cup lifted and tipped on its side, revealing nothing underneath but one small curl of coral ribbon on the surface. Isolated on a transparent background, three-quarter view, soft studio light. Photographic. No text, no logos.

**B.** Three glossy red party cups in a row, one knocked over and clearly empty, the other two upside down. Isolated on a transparent background, soft studio light, gentle shadows. Photographic. No text, no logos.

**C.** An opened cream gift box containing only crumpled tissue paper and nothing else, its lid upside down beside it. Isolated on a transparent background, three-quarter view, soft light. Photographic. No text, no logos.

## 9. Blog: "What is the Gift Genie?" inline image (1 image, 1536x1024)

Placement: in "Why the pins matter so much", which describes this exact trio
(copper herb planter, linen apron, a novel about a botanist). Uses the Genie
purple and gold sub-brand instead of coral.

**A.** Overhead flat-lay on soft lavender linen: a hammered copper herb planter with fresh basil, a folded natural linen apron, and a hardcover novel with a plain sage-green cover. A few tiny warm gold sparkle points float between the objects. Soft daylight. No text, no logos, no people.

**B.** Overhead flat-lay on cream linen with a pale lavender paper strip along one edge: a copper herb planter, a folded linen apron, and a hardcover book with a plain cover, each marked by a small gold push pin beside it. Soft daylight, true colors. No text, no logos, no people.

**C.** Three-quarter photograph of a pale lavender tabletop: a copper planter of thyme, a linen apron draped beside it, and a closed hardcover book with a plain cover, with a small antique brass oil lamp softly out of focus in the back corner. Warm light. No text, no logos, no people.

---

## Recommended order

1. Remove the stock photos: /category swap and the 8 reusable /shuffle tiles
   (no generation), then the 10 new recipient tiles. Biggest "template site"
   tell, and it fixes a broken image.
2. Homepage: hero backdrop, How It Works steps, CTA band, SVG feature icons,
   orphan grid card.
3. Guide template: shared mid-CTA image and image cards for related guides
   (one change reaches 41+ pages).
4. About, wishlist empty state, custom 404, blog inline image.

Total new images: 20 (60 prompt variants to choose from).
