import { guides } from "./guides";

export type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  published: string; // ISO date
  /** ISO date of the last substantive update, if any. */
  updated?: string;
  readingMinutes: number;
  /** Two to five one-line answers shown at the top: the article in brief. */
  takeaways?: string[];
  /**
   * Structured body. Text in "p", list items and table cells may contain [links](/path).
   */
  body: (
    | { type: "p"; text: string }
    | { type: "h2"; text: string }
    | { type: "h3"; text: string }
    | { type: "ul"; items: string[] }
    | { type: "ol"; items: string[] }
    | { type: "table"; head: string[]; rows: string[][] }
    | { type: "callout"; title: string; text: string }
  )[];
  faqs?: { q: string; a: string }[];
};

const allArticles: Article[] = [
  {
    slug: "seo-aeo-geo-explained",
    title: "SEO, AEO and GEO: what changes when search starts answering",
    description:
      "Search results now include direct answers and AI-generated summaries. What each discipline means, what stays the same, and where a business should start.",
    category: "Search growth",
    published: "2026-10-20",
    readingMinutes: 7,
    takeaways: ["SEO earns rankings, AEO earns the direct answer, and GEO earns mentions in AI assistants.", "All three rest on the same foundations: crawlable pages, clear answers and genuine authority.", "Start with technical fixes, then rewrite key pages answer-first, then make your business facts consistent everywhere."],
    faqs: [{"q": "Which should I do first: SEO, AEO or GEO?", "a": "SEO foundations first, because answer features and AI assistants draw heavily on pages that already rank. Answer-first content and consistent business facts then improve all three together."}, {"q": "Is AEO the same as GEO?", "a": "They overlap. AEO focuses on being quoted as the direct answer in search features such as featured snippets and AI Overviews; GEO focuses on being mentioned and recommended by AI assistants such as ChatGPT and Perplexity."}],
    body: [
      { type: "p", text: "For twenty years, being found online meant ranking in a list of ten blue links. That list still matters, but more searches now end with a direct answer, a featured snippet or an AI-generated summary that cites a handful of sources. Three overlapping disciplines have emerged to describe the work involved." },
      { type: "h2", text: "SEO: being eligible and competitive" },
      { type: "p", text: "Search engine optimisation remains the foundation. Pages must be crawlable, fast and clearly about something. They need to answer the search better than competitors, and the site needs enough authority for search engines to trust it. Without this, nothing else works." },
      { type: "h2", text: "AEO: being the answer" },
      { type: "p", text: "Answer engine optimisation focuses on questions. When someone asks how long an interior project takes or what a dental implant involves, the result is often a short, direct answer. AEO structures content so that answer is easy to find and quote: the question as a heading, a clear answer first, and the detail after." },
      { type: "h2", text: "GEO: being represented in AI search" },
      { type: "p", text: "Generative engine optimisation is about how AI assistants and AI-powered search describe and cite your brand. These systems draw on many sources, so the work is broader: consistent business facts across the web, genuine expert content, coverage on sources your industry trusts, and pages that can be read without heavy JavaScript." },
      { type: "h2", text: "What does not change" },
      { type: "ul", items: [
        "There is no special file or markup that guarantees inclusion in AI answers.",
        "Accurate, specific, useful content beats volume.",
        "Credibility comes from real expertise and real mentions, not tricks.",
        "Measurement still matters: Search Console for search, and a documented set of questions and prompts checked over time for answers and AI.",
      ] },
      { type: "h2", text: "Where to start" },
      { type: "p", text: "Fix the technical foundations first, then rewrite your most valuable pages answer-first, then make sure your business details are consistent everywhere they appear. That order improves all three at once." },
    ],
  },
  {
    slug: "redesign-without-losing-rankings",
    title: "How to redesign a website without losing Google rankings",
    description:
      "Most ranking drops after a redesign are avoidable. A practical checklist for content, URLs, redirects and the weeks after launch.",
    category: "Technical SEO",
    published: "2026-10-13",
    readingMinutes: 6,
    takeaways: ["Most ranking drops after a redesign come from changed URLs without redirects, lost content or blocked crawling.", "List every page that earns search traffic before you change anything, and map each old URL to its new home.", "Monitor rankings and Search Console daily for the first weeks after launch."],
    faqs: [{"q": "How long do rankings take to recover after a migration?", "a": "With correct redirects and unchanged content, most sites see little or no drop, and small fluctuations settle within a few weeks. Large drops usually point to missing redirects or removed content."}, {"q": "Should I change URLs during a redesign?", "a": "Only when there's a clear benefit. Every changed URL needs a permanent (301) redirect to its closest equivalent."}],
    body: [
      { type: "p", text: "A redesign is one of the riskiest moments for organic traffic. Pages disappear, URLs change, content is trimmed, and internal links break, all at once. Search engines then have to work out what happened. With a plan, most of that risk can be removed." },
      { type: "h2", text: "Before design starts" },
      { type: "ul", items: [
        "Export every URL that receives organic traffic or has links pointing to it, from Search Console and analytics.",
        "Note which pages bring in enquiries, not just visits.",
        "Record current titles, headings and structured data for important pages.",
      ] },
      { type: "h2", text: "During the build" },
      { type: "p", text: "Keep valuable content. Shorter is not always better: a page that ranks because it answers a question thoroughly will lose ground if the answer is cut. Map every old URL to its closest new equivalent, and only remove a page when nothing on the new site serves the same purpose." },
      { type: "h2", text: "At launch" },
      { type: "ul", items: [
        "Use permanent (301) redirects from every old URL to its new equivalent, without chains.",
        "Update internal links to point directly at new URLs.",
        "Submit the new XML sitemap in Search Console.",
        "Check that staging rules such as noindex or password protection are removed.",
      ] },
      { type: "h2", text: "In the weeks after" },
      { type: "p", text: "Watch Search Console for 404 errors, coverage changes and drops on key queries. Some fluctuation is normal for a few weeks; a sustained drop on specific pages usually points to a missing redirect or missing content that can be fixed quickly." },
    ],
  },
];

const searchArticles: Article[] = [
  {
    slug: "get-recommended-by-chatgpt",
    title: "How to get your business recommended by ChatGPT",
    description:
      "What AI assistants look at when they recommend a business, why some companies are named and others aren't, and the practical steps that improve your chances.",
    category: "GEO",
    published: "2026-11-06",
    readingMinutes: 8,
    takeaways: ["ChatGPT recommends businesses it can find and verify across several trusted sources.", "Clear pages about your services, locations and prices, and consistent listings, make you easier to describe accurately.", "Track a fixed set of customer questions monthly to see whether mentions are growing."],
    faqs: [{"q": "Can I pay to be recommended by ChatGPT?", "a": "Organic answers can't be bought. Visibility comes from being easy to find, clearly described and mentioned by sources the assistant trusts."}, {"q": "Does ChatGPT use Google results?", "a": "ChatGPT search draws on web search results from its search partners and its own crawlers, so pages that are crawlable and rank well elsewhere are more likely to be used."}],
    body: [
      { type: "p", text: "When someone asks ChatGPT, Perplexity or Gemini for the best clinic, school or supplier nearby, the assistant builds a short list from what it can find and trust. There is no form to fill in and no way to pay for a place. What you can do is make your business easy to find, easy to understand and easy to vouch for." },
      { type: "h2", text: "What AI assistants rely on" },
      { type: "ul", items: [
        "Your own website: clear service, location and pricing pages that a crawler can read without running JavaScript.",
        "Consistent facts elsewhere: Google Business Profile, directories, review sites and industry listings that agree on your name, address, services and hours.",
        "Third-party mentions: articles, forum threads, comparison pages and reviews that describe you in context.",
        "Search results: many assistants search the web live, so ranking on Google and Bing still feeds AI answers.",
      ] },
      { type: "h2", text: "Why competitors get named instead" },
      { type: "p", text: "Usually because they are easier to describe. A competitor with a page titled with the exact service and city, a clear paragraph explaining who they serve, a few hundred reviews and a mention in a local guide gives an assistant everything it needs. A business whose site says 'excellence in every smile' and little else gives it nothing to quote." },
      { type: "h2", text: "Practical steps" },
      { type: "ul", items: [
        "Write one clear page for each service and location, with the answer to the obvious question in the first paragraph.",
        "State the facts plainly: who you serve, where, prices or price ranges, timings, credentials.",
        "Make sure robots.txt does not block AI crawlers such as GPTBot, PerplexityBot and Google-Extended, unless you choose to.",
        "Fix inconsistent listings, and ask happy customers for reviews that mention the service they used.",
        "Earn mentions on the sources your industry trusts: local guides, associations, trade publications and genuine forum answers.",
      ] },
      { type: "h2", text: "How to measure it" },
      { type: "p", text: "Write down the twenty to fifty questions your customers actually ask, and check them across ChatGPT, Perplexity, Gemini and Google AI Overviews every month. Record whether you are mentioned, how prominently, and which of your pages are cited. That gives you a visibility trend you can act on, instead of guessing." },
    ],
  },
  {
    slug: "local-seo-checklist",
    title: "A local SEO checklist for businesses in India",
    description:
      "The Google Business Profile, location page, review and citation basics that decide who appears in Maps, 'near me' searches and local AI answers.",
    category: "Local SEO",
    published: "2026-11-03",
    readingMinutes: 6,
    takeaways: ["A complete, accurate Google Business Profile is the single biggest factor in local map results.", "Each location and core service deserves its own page with real local detail.", "Steady, genuine reviews and consistent listings help both Maps rankings and local AI answers."],
    faqs: [{"q": "How many reviews do I need to rank in Google Maps?", "a": "There's no fixed number. Recency, steady flow and relevance matter as much as the total; compare with the businesses currently in the local pack for your main searches."}, {"q": "Do I need a page for every area I serve?", "a": "For your main areas, yes, as long as each page has genuinely local content. Thin pages that only swap the place name rarely help."}],
    body: [
      { type: "p", text: "Most local customers choose from the first three businesses Google Maps shows them. Those positions depend on relevance, distance and prominence, and only the first and last are in your control. This checklist covers what makes the biggest difference." },
      { type: "h2", text: "Google Business Profile" },
      { type: "ul", items: [
        "The right primary category, plus relevant secondary categories.",
        "Accurate name, address, phone, hours and holiday hours.",
        "Services and products listed with descriptions.",
        "Real photos of the premises, team and work, added regularly.",
        "Questions and answers filled in with the things customers really ask.",
      ] },
      { type: "h2", text: "Your website" },
      { type: "ul", items: [
        "A page for each location, with the full address, directions, local landmarks and the services offered there.",
        "LocalBusiness structured data that matches the profile exactly.",
        "Fast pages on mid-range phones and mobile data.",
      ] },
      { type: "h2", text: "Reviews and citations" },
      { type: "p", text: "Ask every happy customer for a review, and reply to every review, good or bad. Make sure your name, address and phone number are identical on the directories that matter in your industry, such as Justdial, Practo, IndiaMART or sector associations. Inconsistent details confuse both Google and AI assistants." },
      { type: "h2", text: "What to avoid" },
      { type: "p", text: "Keyword-stuffed business names, fake addresses and bought reviews. They can work briefly and then get the profile suspended." },
    ],
  },
  {
    slug: "ai-visibility-score",
    title: "What an AI visibility score tells you, and what it doesn't",
    description:
      "How AI visibility is measured across ChatGPT, Perplexity, Gemini and AI Overviews, how to read the numbers, and how to turn them into a content plan.",
    category: "AI search",
    published: "2026-10-29",
    readingMinutes: 5,
    takeaways: ["An AI visibility score summarises how often you're mentioned across a set of prompts and engines.", "Answers vary between sessions and model versions, so trends over a fixed prompt set matter more than any single number.", "Pair the score with which pages are cited and whether descriptions are accurate."],
    faqs: [{"q": "What is a good AI visibility score?", "a": "It depends entirely on the prompt set and competitors. Compare yourself with named competitors on the same prompts, and watch the trend month to month."}, {"q": "Why do AI answers change from one day to the next?", "a": "Assistants generate each answer fresh and may retrieve different sources, so some variation is normal. That's why tracking uses repeated checks over a fixed prompt set."}],
    body: [
      { type: "p", text: "An AI visibility score summarises how often and how prominently a brand appears when AI assistants answer a defined set of prompts. It is a useful trend line, but only if you understand what goes into it." },
      { type: "h2", text: "How it is usually measured" },
      { type: "ul", items: [
        "A fixed list of prompts your customers actually use, grouped by topic.",
        "Each prompt run on several engines, such as ChatGPT, Perplexity, Gemini, Claude and Google AI Overviews.",
        "Each answer scored for whether you are mentioned, where in the answer, and how you are described compared with competitors.",
        "Cited pages recorded, so you can see which content AI assistants rely on.",
      ] },
      { type: "h2", text: "How to read it" },
      { type: "p", text: "Look at the trend and the gaps, not a single number. AI answers vary from run to run, so a score is most useful as a monthly average across many prompts. The most actionable part is usually the list of prompts where competitors appear and you don't, and the pages being cited for them." },
      { type: "h2", text: "What it doesn't tell you" },
      { type: "p", text: "It doesn't tell you how many people asked those questions, and it isn't a measure of revenue. Pair it with Search Console data, referral traffic from AI assistants and, most importantly, enquiries." },
    ],
  },
];

/** Published articles: search topics only. */
export const articles = [...guides, ...searchArticles, ...allArticles];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}
