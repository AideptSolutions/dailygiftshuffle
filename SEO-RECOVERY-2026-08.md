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
