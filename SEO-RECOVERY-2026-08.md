# SEO Recovery Log - August 2026

Durable record of the Google ranking collapse found on 2026-08-26 and the
remediation taken. Companion to CATALOG-DATA-QUALITY.md.

## The finding (GSC export, last 28 days: Jul 28 - Aug 24)

- 2 clicks, ~2,330 impressions, sitewide average position 84. Nothing ranked
  above position 26. Flat across the whole window, so the drop happened before
  Jul 28 (sometime in July).
- Against the June baselines this is a uniform site-level demotion, not
  seasonality: the "birthday gift ideas" head fell from position 16 (1,678
  impressions) to position ~85 (6 impressions); the 2026-term pages that owned
  page 1 became invisible; every surviving page sits at page 8-9.
- The site is demoted, NOT deindexed: 545 distinct queries still trigger
  impressions and Google still maps the site to the right topics (luxury /
  christmas / coworker clusters lead). Bing is a separate index and was not
  affected; the IndexNow -> Bing -> ChatGPT-search channel still works.

## Drop date confirmed (6-month GSC export, added same day)

Daily data pinpoints the collapse inside the July 2026 core update rollout
(reported complete July 17 after 2+ weeks):

- Growth ramp peaked the week of Jun 29: ~2,950 impressions, 14 clicks,
  avg position 26.
- Positions slid day by day through the rollout: Jul 4 pos 21 -> Jul 8
  pos 41 -> Jul 11 pos 62; impressions cliffed ~90% on Jul 12
  (237 -> 21/day). A second leg settled everything at pos 80+ by Jul 27.
- Pre-collapse winners to watch for recovery: /best-gifts-for-her-2026
  (19 clicks, pos ~12), the "... 2026" query family (pos 8-10 across a
  dozen queries), /category/luxury (pos 18), /birthday-gift-ideas
  (4,049 impressions), /category/gaming (pos 22).

A core update is exactly where site-level quality classifiers get
reweighted, which fits the doorway-page hypothesis below. Recovery
typically requires a subsequent core update after cleanup; with the
current ~quarterly cadence, realistically Sep-Oct 2026.

## Root-cause hypothesis (high confidence)

~650 programmatic doorway pages at /gifts/{slug}, generated since the March
launch from slug templates (best|unique|thoughtful-gifts-for-{13 recipients}
x {16 occasions}, plus budget combos). Nonsense combos existed
(best-gifts-for-employees-wedding, unique-gifts-for-baby-fathers-day,
thoughtful-gifts-for-myself-baby-shower), and the template padded any combo
with fewer than 6 matches using slug-hash-RANDOM products, i.e. keyword-stuffed
URLs with arbitrary content. This is the exact pattern of Google's scaled
content abuse / doorway policies. The pages earned 1-2 impressions each and
zero clicks; a July core/spam update reassessing the site with them on board
is the most likely trigger for the sitewide demotion.

## Remediation shipped 2026-08-26

- Deleted app/gifts/[slug]/page.tsx (the doorway generator) and
  data/gift-slugs.ts (650 slugs). Build went from 799 to 149 pages.
- Replaced the route with a route handler returning **410 Gone** +
  X-Robots-Tag: noindex for every old combo URL, so crawlers treat the removal
  as permanent and drop the URLs faster than a 404 would.
- Hand-built /gifts/last-minute-mothers-day is a static sibling route and
  takes precedence: it still serves 200 and stays in the sitemap. The ~45
  curated guide pages are untouched.
- Verified before deploy: combos 410 with noindex header; kept pages 200;
  no internal links referenced the combos; sitemap never listed them.

## Diagnosis closed 2026-08-26

Owner checked GSC: NO manual actions, NO security issues. The demotion is
purely algorithmic (July 2026 core update site-level reassessment), which
means there is nothing to appeal and no reconsideration request to file.
The recovery path is exactly the cleanup already shipped plus time: Google
re-evaluates at a subsequent core update.

## What recovery looks like / next checks

- Owner checklist: GSC -> Manual actions + Security issues (rule out; pattern
  is algorithmic). GSC Performance at 6 months to pinpoint the drop week and
  match it to a named July update.
- Expect the 410s to clear from the index over days-weeks. Site-level
  reassessment typically lifts on a subsequent core update: weeks to a couple
  of months after cleanup. Re-export GSC monthly and compare against this
  file's baseline numbers.
- Do not rebuild scaled combo pages. New landing pages must be hand-curated
  with real selection logic (see check-fit.mjs / check-guide-quality.mjs
  gates). The Gift Genie + editorial features are the differentiation signal.

## Checkpoint 2026-09-04 (9 days post-cleanup)

- No ranking recovery yet (expected; next core update is the real test).
  Nothing above pos ~27.
- Mild positive drift: 86 -> 107 impr/day, weighted pos 83.9 -> 81.6
  (within noise).
- Christmas seasonality already ramping: /christmas-gifts-for-her 6 -> 184
  impr at pos 86. Q4 stakes rising while demoted.
- 40 doorway /gifts/ URLs still drew 91 impressions: 410s not yet fully
  processed. If still present in the October export, file a GSC Removals
  prefix request for /gifts/ to hide them faster.

## Checkpoint 2026-09-25 (30 days post-cleanup; export window Aug 27 - Sep 23)

- Still no recovery: 0 clicks in 28 days, weighted position ~83 (flat vs
  81.6 at the Sep 4 checkpoint; the mild positive drift did not hold). No
  September core update has been observed to re-evaluate the site yet.
- Impressions are DECLINING through the window: ~120-170/day in late Aug
  down to ~22-40/day in the last week. Part of this is doorway impressions
  finally dropping out, but the core pages are fading too, which reads as
  the demotion deepening or a seasonal lull, not recovery.
- Top impression earners: /luxury-gifts-for-her 570 impr at pos 80,
  /christmas-gifts-for-her 216 at pos 87, /gifts-for-coworkers 140 at pos
  94. Q4 seasonality is building while the site remains buried.
- Doorways: 23 /gifts/ URLs still drew ~52 impressions (down from 40 URLs
  and 91 impressions on Sep 4, but a full month after the 410s shipped).
  Per the Sep 4 escalation rule, it is time to file the GSC Removals
  prefix request for https://www.thegiftshuffle.com/gifts/ (owner action,
  GSC -> Removals -> New request -> Remove all URLs with this prefix).
  Tradeoff accepted: the prefix also hides the hand-built
  /gifts/last-minute-mothers-day for ~6 months; it has zero impressions in
  this export and its season is next May, so nothing is lost.
- /gift-genie and /blog/what-is-the-gift-genie (both live since Sep 4 with
  full schema + sitemap + IndexNow): zero Google impressions so far. Worth
  a URL Inspection in GSC to confirm indexing; the site-level demotion
  likely suppresses them regardless until a core update lifts it.
- Bright spots are noise-level but real: /help-me-pick-a-gift pos 30 on 17
  impr ("pick a gift" pos 26.6), homepage pos 29.9, and a few pos 1-9
  showings on single-impression long-tail queries. The site is not
  deindexed, just demoted.

## Checkpoint 2026-10-04 (7-day export, Sep 23-29): FIRST SIGNS OF RE-RATING

- Daily weighted position moved from ~84 (flat since July) to 64-72 across
  Sep 24-29, the first sustained improvement in any export since the
  collapse. Multiple pages and queries moved together, which reads as a
  partial re-rating rather than noise:
  - /mothers-day-gifts pos 35.9, /gift-ideas-for-him pos 38.4 (both were
    pinned in the 80s), /help-me-pick-a-gift 24.8, /category/gardening 25.4
  - Queries: "small birthday gifts for him" 21.3, "pick a gift" 24.8,
    "gift sets for mom" 25.6, "mothers day experience gifts" 26,
    "gift ideas for him" 47.6, "gift ideas for husband" 48
- Still zero clicks, and the heads that matter for Q4 remain buried
  (/christmas-gifts-for-her 88.9, /luxury-gifts-for-her 82.7), so this is
  early movement, not recovery. Watch whether the mid-range positions hold
  and spread in the next export.
- Doorway cleanup nearly complete: 5 /gifts/ URLs surfaced (23 at the Sep
  25 checkpoint, 40 on Sep 4). The GSC Removals prefix request filed Sep 25
  is doing its job.
- /gift-genie, the article, and /halloween-party-gifts show no impressions
  yet; the Halloween guide only went live Sep 27, inside this window.
- Next export should use the 28-day view again for comparability.

### 28-day confirmation (second Oct 4 export, Sep 2 - Sep 29)

The full window makes the break unambiguous: position sat at 78-88 every
day from Sep 2 through Sep 23, then snapped to 64-72 on Sep 24 and held
through Sep 28 (Sep 29 drifted back to 79.9, which looks like rollout
turbulence rather than reversal). A sharp dated break across the whole
site is the signature of an algorithm update beginning to re-score the
site, exactly the mechanism the cleanup was waiting for. Impressions are
unchanged (~30-70/day), so Google is re-rating before re-surfacing;
impressions and clicks would follow only if positions keep climbing into
the top 30. The Q4 heads are still 80+ in the 28-day averages, but
/gift-ideas-for-him already shows the blend (68.9 for the window vs 38.4
inside the last week). Doorways: 10 in this window, 5 in the last 7 days,
trending to zero.

## Checkpoint 2026-10-09: cross-channel readout (GSC + Bing WMT + GA4 + Vercel)

GOOGLE (GSC 28d through Oct 6): the Sep 24-28 re-rating partially
retraced. Daily position settled at ~73-83 for Sep 29 - Oct 6: better
than the pre-break 83-88 ceiling but not the mid-60s of the break week.
Holdouts that kept their gains: /mothers-day-gifts 35.1,
/gift-ideas-for-him 66.4 window avg. Q4 heads still buried
(/christmas-gifts-for-her 88.8, /christmas-gift-ideas 90.8). Still 0
Google clicks. /halloween-party-gifts earned its first Google impression
(pos 77, 9 days after launch). Doorways: 11 in window, old tail only.

BING WMT (Sep 9 - Oct 6): the real story. 22 CLICKS in ~3 weeks,
starting Sep 15, with impressions tripling from ~5-10/day to ~25-35/day
through late Sep. First channel delivering actual search clicks since
the July Google collapse.

GA4 (Sep 11 - Oct 8, 232 active users): source mix proves the
two-engine strategy: bing 21 + yahoo 12 + duckduckgo 8 + ecosia 2 vs
google 1. chatgpt.com / ai-assistant sent 12 users: the AEO channel is
real and roughly matching Bing itself. Direct 173 is inflated by
datacenter traffic (Singapore 84 + Ashburn 40), which also explains the
91 percent Vercel bounce rate; engaged-user numbers are the trustworthy
ones.

CONTENT: /stocking-stuffers is the breakout: top page in both Vercel
(57 visitors) and GA4 (39 views at 27 percent bounce, the best
engagement on the site). Teens, girlfriend, mom, and gaming pages
follow. Halloween guide: 7 Vercel visitors in its first ~10 days.

READ: Google is drifting rather than snapping back; the Bing/ChatGPT
channel is compounding into Q4. Stocking stuffers is the page to
strengthen for the season.

## Checkpoint 2026-10-20 (GSC 28d through Oct 18 + GA4 Sep 22 - Oct 19)

GOOGLE: the Sep 24-28 re-rating FULLY RETRACED. Daily position returned
to 80-85 from Oct 1 onward and stayed there; the break week was a
transient test, not the recovery. Still 0 Google clicks. What survived:
/gift-ideas-for-him and /mothers-day-gifts keep better positions than
pre-break in their window averages. New pages are at least indexed and
earning first impressions: /stocking-stuffers 15 impr (pos 85),
/halloween-party-gifts 2, /gift-genie 1 (pos 81; indexing request
worked). Doorway tail unchanged at 11 old-window URLs. Bing WMT export
failed this time (Bing error page instead of CSV); re-export when the
service cooperates.

GA4 (28d, 249 users): the Bing-ecosystem channel nearly doubled: bing
40 users (21 prior), duckduckgo 15 (8), yahoo 15 (12), ecosia 2, versus
google 0. chatgpt.com 8 (12 prior). Average engagement time jumped from
15.1s to 27.7s per user. First awin referral sessions (4) showed up
from the owner working the Awin dashboard.

CONTENT: /stocking-stuffers extended its lead: 67 views, 57 users,
22.7 percent bounce (best on site, improving). The six spokes shipped
Oct 9 are collecting first visits (for-her 3, under-10 2, others 1
each). Girlfriend, teens and mom pages follow the hub.

READ: Google recovery remains gated on a future core update; the site
is compounding where it can win now. Next: re-pull Bing WMT, and the
late-Oct GSC export may catch the next re-rating attempt.

### Bing WMT follow-up (Oct 21 export, daily series Aug 11 - Oct 18)

The export succeeded on the third attempt and shows a clean compounding
curve. By month: August 1 click on 70 impressions (3.3/day), September
20 clicks on 385 (12.8/day), October 1-18 already 30 clicks on 513
(28.5/day). The most recent week (Oct 12-18) ran 12 clicks on ~35
impressions/day: roughly 10x the August impression rate and a steady
~1.7 clicks/day. Inflection points line up with the work: the first
sustained clicks begin mid-September (Genie prominence + IndexNow full
resubmit), and the Oct 9 stuffers cluster push precedes the strongest
week on record. 51 total Bing clicks since Aug 11 vs 0 Google clicks in
the same span.

## 2026-10-29: Trending gifts page + stocking-stuffer retention

- New page /trending-christmas-gifts-2026 (GiftGuideTemplate, answer box +
  5 FAQs, 31 products: the 20 trend26 additions plus 11 catalog items on
  2026 hot lists). Linked from the footer, Christmas Gift Ideas, and every
  stocking stuffer page; in the sitemap. Hero is a lineup of six product
  photos (OpenAI image credits ran out again 2026-10-29; swap in a generated
  hero when topped up).
- Retention for /stocking-stuffers traffic (the breakout page): every
  stocking page now has a "main gift" section right after its grid (photo
  cards matched to the page: her -> Christmas gifts for her, kids -> the
  trending page, under $10 -> gifts under $25, etc.) and a return nudge:
  after a product click opens Amazon in a new tab, coming back to our tab
  shows one dismissible card pointing to the matched page, once per session.
- Measurement: GA4 event next_gift_nudge with nudge_action shown / click /
  dismiss, from_page, to_page. Click-through rate = click / shown. Also watch
  stocking-page exits vs. views of the target pages in GA4 path exploration.
- 2026-10-29 (later): OpenAI credits restored; the trending page hero is now
  a generated flat-lay (gpt-image-2). scripts/gen-image.mjs defaults to
  gpt-image-2 because gpt-image-1 was retired for generation (the API says
  the model "does not exist"); pass --model to override.
- 2026-10-29 (later): the six older Christmas heroes (christmas-gift-ideas,
  christmas-gifts-for-her, christmas-gifts-for-him, secret-santa-gifts,
  white-elephant-gifts, stocking-stuffers) were stock photos, one showing a
  person's hands. They are replaced with gpt-image-2 flat-lays in the house
  style (cream linen, pine, coral ribbon only, true product colors, gifts in
  one row across the center band), same filenames, with new alt text that
  names the items. The six stocking spoke heroes (2026-10-09) were already
  generated in this style and were left as is.
- 2026-10-29 (later): holiday heroes outside Christmas regenerated the same
  way. Father's Day (hub, under $25/$50/$100, top 10), Mother's Day (hub,
  for wife, under $25/$50/$100, last minute) and patriotic-gifts now use
  gpt-image-2 flat-lays (eucalyptus accent for dad, pink tulips for mom, a
  folded flag for patriotic; coral ribbon only). Problems fixed: four
  Mother's Day pages shared one identical stock image, the Father's Day
  under $25 hero showed a Christmas candy cane, and several showed people or
  printed text. Same file paths; alt text rewritten to name the items
  (including the homepage Mother's Day tile). halloween-party-gifts kept its
  generated dark party-table hero from 2026-09-27 on purpose.

## Checkpoint 2026-10-30 (GSC 28d Oct 1-28, Bing WMT Sep 30 - Oct 28, Bing AI citations Aug 11 - Oct 28, GA4 Oct 2-29, Vercel 30d)

GOOGLE: unchanged. 1 click on 964 impressions (the first Google click in
months, /christmas-gift-ideas on Oct 23), daily position 79-87 except two
one-day blips (Oct 19 68.7, Oct 21 64.7). Still the sitewide demotion.
Impressions are led by the luxury cluster (luxury-gifts-for-her 247 impr
at ~81) and Christmas pages (christmas-gift-ideas 139, christmas-gifts-for-her
103), all page 8-9. The one striking-distance query: "pick a gift" 23 impr
at 24.1, landing on /help-me-pick-a-gift (page avg 26.8, best on the site).
The site:instagram.com / site:youtube.com "position 1" rows are operator
queries, not real rankings; ignore them.

BING SEARCH: steady, not accelerating. 49 clicks on 908 impressions in 29
days. Impressions per day kept rising (28.5 for Oct 1-18, 36.2 for Oct
19-28) but clicks held flat at ~1.6-1.7 a day, so CTR slipped. The export
is overview only; a Bing pages/queries export is needed to see which
pages gained impressions without clicks.

BING AI CITATIONS (Copilot grounding): by month August 119/day, September
175/day, October 209/day, but the weekly series peaked at 433/day (week of
Sep 28) and fell to ~82-92/day from Oct 16 on, while the number of cited
pages ROSE (9 to 11-13). So citations spread across more pages but each is
cited far less. The only site change near Oct 16 was a footer link
(da5dcec), which is not a plausible cause; most likely a Copilot-side
change or a shift in the query mix. Cause unknown; needs the Bing AI
performance page-level table to diagnose.

GA4 (297 active users, up from 249): bing 45 (40), duckduckgo 17 (15),
yahoo 17 (15), ecosia 3, chatgpt.com 6 (8, and 12 the period before),
perplexity 1, google 0. Engagement 24.8s per user (27.7s prior).
/stocking-stuffers: 76 views, 65 users, 27.6 percent bounce, still the
best-engaged page. Pages with real volume and no engagement:
gifts-for-girlfriend 20 views / 18 users / 100 percent bounce, teens 11 /
100 percent, mom 13 / 92 percent, brother 12 / 92 percent. The girlfriend
page does not appear in Vercel's top pages (6+ visitors), so its GA4
traffic is likely automated; check its session source in GA4 before
acting on it.

VERCEL (30d): 315 visitors (+51 percent), 384 views (+60 percent),
bounce 90 percent (inflated by datacenter traffic: Singapore 19 percent,
China 10 percent). /stocking-stuffers 110 visitors, / 52, /shuffle 16,
/white-elephant-gifts 16, /category/halloween 10. Referrers: bing 52,
duckduckgo 49 (big jump), yahoo 24, ecosia 4, google 3. One-day spike to
~32 visitors on Oct 25-26 (GA4 shows 32 new users that day); source not
identifiable from these exports.

READ: the Bing-ecosystem channel is holding at its October level and
traffic grew on Christmas-season demand, led by stocking stuffers. Google
is still suppressed. The new risk is the AI citation drop since Oct 16.
Next data to pull: Bing WMT Search Performance pages + queries export,
Bing AI performance page-level table, GA4 source for gifts-for-girlfriend.
The next_gift_nudge event (shipped Oct 29) needs its GA4 custom
dimensions registered before its reports will populate.

### Bing WMT page traffic (Oct 30 export; range not stated in the file, totals 1,196 impr / 68 clicks, so longer than the 29-day overview)

- Bing ranks the site on page 1 where Google has it near position 80:
  most pages sit at average position 2.5-7.
- /stocking-stuffers: 681 impressions, 53 clicks, CTR 7.8 percent, position
  5.2. That is 57 percent of Bing impressions and 78 percent of Bing clicks.
  Moving it from ~5 into the top 3 during the Nov-Dec peak is the largest
  available gain.
- /gifts-for-a-crush: 124 impressions at position 5.4 but CTR 1.6 percent
  (2 clicks), the clearest snippet/intent mismatch; needs the Bing
  keywords for that page before rewriting the title.
- Zero clicks at top-5 positions: best-gaming-gifts-2026 (34 impr, 3.7),
  birthday-gifts-for-gamers (25, 4.2), luxury-gifts-under-200 (19, 3.8).
  Samples are too small to call (about 1-2 clicks expected at those
  positions), so watch rather than act.
- Healthy: luxury-gifts-under-50 (position 2.5, CTR 14.8 percent),
  best-birthday-gifts-2026 (4.2, 10 percent).
- Legacy rows (non-www /gifts/* and /category/*) are fine: non-www 308s to
  www and the old /gifts/* doorways return 410, so Bing will drop them.
