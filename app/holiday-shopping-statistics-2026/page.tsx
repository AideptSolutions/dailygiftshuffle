import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import GiftGuideTemplate from '@/components/GiftGuideTemplate';
import { curate, shufflePool, ALL } from '@/lib/giftSelect';

const URL = 'https://www.thegiftshuffle.com/holiday-shopping-statistics-2026';

export const metadata: Metadata = {
  title: 'Holiday Shopping Statistics 2026: Spending, Timing, Gifts and AI | TheGiftShuffle',
  description:
    'Key 2026 holiday shopping statistics from NRF, Deloitte, Adobe and Basis, plus what top-rated gifts actually cost. $1,654 average household spend, $275.1 billion online, 64% shopping Thanksgiving weekend.',
  keywords: [
    'holiday shopping statistics 2026',
    'holiday spending 2026',
    'how much will people spend on christmas 2026',
    'christmas shopping statistics',
    'average holiday spending 2026',
    'holiday shopping trends 2026',
  ],
  openGraph: {
    title: 'Holiday Shopping Statistics 2026',
    description: 'Sourced 2026 holiday shopping figures on spending, timing, gifts and AI, plus what top-rated gifts cost.',
    type: 'article',
    url: URL,
    images: [{ url: 'https://www.thegiftshuffle.com/images/heroes/holiday-shopping-statistics-2026.jpg', width: 1200, height: 800 }],
  },
  alternates: { canonical: URL },
};

const SRC = {
  nrfForecast: 'https://nrf.com/media-center/press-releases/nrf-forecasts-2026-holiday-sales-growth-as-consumers-remain-resilient',
  nrfSurvey: 'https://nrf.com/media-center/press-releases/affordability-shapes-winter-holiday-shopping-according-to-nrf-holiday-survey',
  nrfBlog: 'https://nrf.com/blog/2026-holiday-shopping-trends-what-consumers-are-planning',
  deloitte: 'https://www.deloitte.com/content/dam/insights/articles/2026/amer189387_cic_holiday-retail-survey/pdf/DI_2026-Holiday-Retail-Survey.pdf',
  adobe: 'https://news.adobe.com/news/2026/09/adobe-us-holiday-shopping-season-to-hit-record',
  basis: 'https://basis.com/news/one-third-of-holiday-shoppers-expect-to-spend-more-on-gifts-in-2026-due-to-inflation',
};

type Stat = [figure: string, detail: ReactNode, source: string, href: string];

const SECTIONS: { heading: string; stats: Stat[] }[] = [
  {
    heading: 'Spending',
    stats: [
      ['$1.013 trillion', 'Forecast US holiday retail sales for November and December, up 4.2% from 2025', 'NRF', SRC.nrfForecast],
      ['$1,654', 'Average expected holiday spend per household, up 4%', 'Deloitte', SRC.deloitte],
      ['$988', 'Of that, spending on gifts and other retail goods, up 10%, while holiday activities like travel and hosting fall 4%', 'Deloitte', SRC.deloitte],
      ['79%', 'Of consumers expect holiday prices to be higher than last year', 'Deloitte', SRC.deloitte],
      ['35%', 'Of consumers plan to spend more than in 2025; most of them blame inflation', 'Basis', SRC.basis],
    ],
  },
  {
    heading: 'Online and timing',
    stats: [
      ['$275.1 billion', 'Forecast US online holiday spending, November 1 to December 31, up 6.7%', 'Adobe', SRC.adobe],
      ['$15.1 billion', 'Forecast Cyber Monday online spending, the biggest day of the season; Black Friday $12.9 billion', 'Adobe', SRC.adobe],
      ['64%', 'Of consumers are likely to wait until Thanksgiving weekend to do most of their shopping', 'NRF', SRC.nrfSurvey],
      ['28%', 'Of holiday budgets are expected to be spent by the end of October, the highest share in six years', 'Deloitte', SRC.deloitte],
      ['57.4%', 'Of online holiday spending is forecast to happen on phones', 'Adobe', SRC.adobe],
    ],
  },
  {
    heading: 'What people give and want',
    stats: [
      ['47%', 'Would like to receive gift cards, still the top wish; clothing is next at 44%', 'NRF', SRC.nrfSurvey],
      ['50%', 'Of shoppers plan to give an experience, up from 39% in 2024', 'Deloitte', SRC.deloitte],
      ['27%', 'Of shoppers plan to give an experience, up from 19% five years ago (a narrower question than Deloitte\'s)', 'NRF', SRC.nrfBlog],
      ['47%', 'Prefer to give one meaningful, higher-cost gift rather than several smaller ones', 'Deloitte', SRC.deloitte],
    ],
  },
  {
    heading: 'AI and search',
    stats: [
      ['130%', 'Forecast growth in visits to US retail sites from generative AI tools', 'Adobe', SRC.adobe],
      ['39%', 'Say generative AI is their main tool for at least one holiday shopping task', 'Deloitte', SRC.deloitte],
      ['16%', 'Would trust AI to complete a purchase for them, even with permission', 'Deloitte', SRC.deloitte],
      ['17%', 'Of shoppers planned in May to use AI for holiday shopping, mostly for deals and gift ideas', 'Basis', SRC.basis],
    ],
  },
];

// Our catalog, as listed on Nov 9, 2026: products rated 4.5+ with 1,000+ reviews.
const CATALOG_BY_RECIPIENT: [string, string][] = [
  ['Coworkers', '$16.99'],
  ['Pets', '$21.99'],
  ['Grandparents', '$22.97'],
  ['Kids', '$24.00'],
  ['Teens', '$28.87'],
  ['Friends', '$29.99'],
  ['Mom', '$31.99'],
  ['Her', '$32.99'],
  ['Dad', '$35.00'],
  ['Him', '$37.44'],
  ['Couples', '$39.90'],
];

const cell = 'py-1.5 px-3 align-top';

const underFifty = (p: { price?: number }) => (p.price ?? 999) < 50;
const grid = curate({ match: underFifty, minRating: 4.6, sort: 'social', recipientCap: 6, limit: 24, pool: ALL });
const shuffle = shufflePool(underFifty, ALL);

export default function Page() {
  return (
    <GiftGuideTemplate
      canonicalUrl={URL}
      schemaName="Holiday Shopping Statistics 2026"
      schemaDescription="Sourced 2026 US holiday shopping statistics and the typical price of a top-rated gift, compiled by TheGiftShuffle"
      breadcrumbLabel="Holiday Shopping Statistics 2026"
      breadcrumbHref="/holiday-shopping-statistics-2026"
      heroSrc="/images/heroes/holiday-shopping-statistics-2026.jpg"
      heroAlt="Holiday planning flat lay on cream linen: a notebook with a sketched bar chart, a calculator, a phone, blank gift tags, a gift card and a wrapped gift"
      h1="Holiday Shopping Statistics 2026"
      updated="2026-11-09"
      intro={
        <>
          <p>
            The key <strong>2026 holiday shopping statistics</strong> in one place: how much
            Americans plan to spend, when they shop, what they want to receive, and how AI is
            changing gift shopping. Every figure links to its original source, and the last section
            adds our own data on what top-rated gifts actually cost.
          </p>
          {SECTIONS.map((s) => (
            <div key={s.heading} className="overflow-x-auto">
              <table className="w-full text-sm sm:text-base text-left border border-[#E2E8F0] rounded-xl overflow-hidden bg-white">
                <caption className="text-left font-bold text-gray-900 mb-2">{s.heading}</caption>
                <thead>
                  <tr className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                    <th scope="col" className="py-2 px-3 w-28">Figure</th>
                    <th scope="col" className="py-2 px-3">What it means</th>
                  </tr>
                </thead>
                <tbody>
                  {s.stats.map(([figure, detail, source, href]) => (
                    <tr key={`${figure}-${source}`} className="border-t border-gray-100">
                      <td className={`${cell} font-bold text-gray-900 tabular-nums whitespace-nowrap`}>{figure}</td>
                      <td className={cell}>
                        {detail}{' '}
                        <a href={href} target="_blank" rel="noopener noreferrer" className="text-sm text-[#F04E30] underline underline-offset-2 whitespace-nowrap">
                          {source}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
          <h2 className="text-xl font-bold text-gray-900 pt-2">What a top-rated gift costs in 2026</h2>
          <p className="text-base">
            We looked at the 837 gifts in our catalog rated 4.5 stars or higher with more than 1,000
            reviews. The median price is <strong>$30.99</strong>: 41% cost under $25, and 71% cost
            under $50. Cheaper gifts also rate slightly higher, averaging 4.60 stars under $25 against
            4.49 stars between $100 and $250.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm sm:text-base text-left border border-[#E2E8F0] rounded-xl overflow-hidden bg-white">
              <caption className="text-xs text-gray-500 text-left mb-2">
                Median price of a top-rated gift by recipient, TheGiftShuffle catalog, November 9, 2026
              </caption>
              <thead>
                <tr className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                  <th scope="col" className="py-2 px-3">Shopping for</th>
                  <th scope="col" className="py-2 px-3 text-right">Median price</th>
                </tr>
              </thead>
              <tbody>
                {CATALOG_BY_RECIPIENT.map(([who, price]) => (
                  <tr key={who} className="border-t border-gray-100">
                    <td className="py-1.5 px-3">{who}</td>
                    <td className="py-1.5 px-3 text-right font-semibold tabular-nums">{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500">
            Sources: NRF forecast (October 15, 2026) and survey of 8,094 adults (October 1 to 7);
            Deloitte Holiday Retail Survey of 4,000 consumers (August 26 to September 10); Adobe
            Digital Insights forecast (September 28), based on Adobe Analytics data; Basis and GWI
            survey of 2,006 consumers (May 2026). Forecasts are projections, not results. Catalog
            prices are as listed on November 9, 2026 and change often.
          </p>
        </>
      }
      answer={{
        heading: 'How Much Will Americans Spend on the Holidays in 2026?',
        body: (
          <p>
            Americans are expected to spend more this holiday season. NRF forecasts{' '}
            <strong>$1.013 trillion</strong> in November and December retail sales, up 4.2%, and
            Deloitte expects the average household to spend <strong>$1,654</strong>, up 4%, with
            gift spending rising faster than travel. Adobe forecasts a record{' '}
            <strong>$275.1 billion</strong> online. Most of the increase reflects higher prices: 79%
            of shoppers expect to pay more than last year.
          </p>
        ),
      }}
      shuffleHeading="Shuffle Top-Rated Gifts Under $50"
      shuffleProducts={shuffle}
      gridHeading="Top-Rated Gifts Under $50"
      gridProducts={grid}
      ctaHeading="Turn the Numbers Into a Gift"
      ctaText="Tell TheGiftShuffle who it is for and your budget, and get a top-rated match in one click."
      faqs={[
        {
          q: 'When do most people do their holiday shopping in 2026?',
          a: 'Most people still shop late. NRF found 64% of consumers are likely to wait until Thanksgiving weekend to do most of their shopping. Shopping is also starting earlier for many: Deloitte expects 28% of holiday budgets to be spent by the end of October, the highest share in six years, and 22% of shoppers plan to start earlier than last year.',
        },
        {
          q: 'What gifts do people want most in 2026?',
          a: 'Gift cards are still the most wanted gift: 47% of consumers told NRF they would like to receive one, followed by clothing at 44%, books and other media at 25%, and personal care or beauty items at 24%. Gen Z most wants clothing and accessories, while 59% of Boomers most want gift cards.',
        },
        {
          q: 'Are experience gifts popular in 2026?',
          a: 'Yes, and growing. Deloitte found 50% of shoppers plan to give an experience this year, up from 39% in 2024, and 79% of them want to pair it with a physical gift. NRF, which asked a narrower question, puts it at 27%, up from 19% five years ago. Restaurant meals and event tickets are the most common experience gifts.',
        },
        {
          q: 'How many people use AI for holiday shopping?',
          a: 'A growing minority. Deloitte found 39% of shoppers say generative AI is their main tool for at least one holiday shopping task, but only 16% would trust it to complete a purchase. Adobe forecasts visits to retail sites from generative AI tools will grow 130% this season. Earlier in the year, Basis found 17% planned to use AI, mostly to find deals and gift ideas.',
        },
        {
          q: 'What is the biggest online shopping day of 2026?',
          a: 'Cyber Monday, November 30. Adobe forecasts $15.1 billion in US online spending that day, up 6.2%, ahead of Black Friday at $12.9 billion, which is growing faster at 9.2%. The five days from Thanksgiving to Cyber Monday are forecast to bring in $47.5 billion online.',
        },
        {
          q: 'How much should I spend on a gift?',
          a: 'You do not need to spend much to give a well-loved gift. Across 837 top-rated gifts in our catalog, the median price is $30.99, and 71% cost under $50. Typical top-rated gifts run about $17 for coworkers, $24 for kids, $32 for mom and $35 for dad. Spend what fits your budget, and pick for the person rather than the price.',
        },
      ]}
      relatedHeading="More Holiday Guides"
      relatedLinks={[
        { href: '/trending-christmas-gifts-2026', label: 'Trending Christmas Gifts 2026' },
        { href: '/christmas-gift-ideas', label: 'Christmas Gift Ideas' },
        { href: '/gifts-under-25', label: 'Gifts Under $25' },
        { href: '/gifts-under-50', label: 'Gifts Under $50' },
        { href: '/stocking-stuffers', label: 'Stocking Stuffers' },
        { href: '/last-minute-christmas-gifts', label: 'Last-Minute Christmas Gifts' },
      ]}
    />
  );
}
