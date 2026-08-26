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
