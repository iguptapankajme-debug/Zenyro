import type { Icon3DName } from "@/components/home/primitives";

/** Example searches and AI prompts per industry, shown in the industry page's search snapshot. */
export const industryAsks: Record<string, [Icon3DName, string, string][]> = {
  "real-estate": [["globe", "3 BHK apartments in Mohali under 1.2 crore", "Google"], ["chatgpt", "Which builders in Chandigarh deliver on time?", "ChatGPT"], ["perplexity", "Is Zirakpur a good area to buy a flat?", "Perplexity"], ["gemini", "Ready-to-move villas near Kharar", "Gemini"]],
  hospitality: [["globe", "boutique hotel in Shimla with mountain view", "Google"], ["chatgpt", "Best wedding venue in the Chandigarh Tricity?", "ChatGPT"], ["gemini", "Family resort near Manali with a pool", "Gemini"], ["perplexity", "Heritage hotels in Jaipur under ₹10,000", "Perplexity"]],
  healthcare: [["globe", "root canal treatment near me", "Google"], ["chatgpt", "Best dentist for kids in Mohali?", "ChatGPT"], ["gemini", "Which IVF centres in Punjab have good reviews?", "Gemini"], ["perplexity", "How long does knee replacement recovery take?", "Perplexity"]],
  "interior-design": [["globe", "modular kitchen designer Chandigarh", "Google"], ["chatgpt", "Interior designer for a 3BHK in Mohali?", "ChatGPT"], ["gemini", "How much does a full home interior cost?", "Gemini"], ["perplexity", "Luxury furniture showroom in Ludhiana", "Perplexity"]],
  education: [["globe", "IELTS coaching near me", "Google"], ["chatgpt", "Best CBSE schools in Panchkula?", "ChatGPT"], ["gemini", "Which institutes have small batches for NEET?", "Gemini"], ["perplexity", "Fees for a BBA in Chandigarh", "Perplexity"]],
  "home-improvement": [["globe", "solar panel installer Ludhiana", "Google"], ["chatgpt", "Best tiles dealer in Chandigarh?", "ChatGPT"], ["gemini", "Which modular kitchen brands last longest?", "Gemini"], ["perplexity", "UPVC windows price per square foot", "Perplexity"]],
  "travel-tourism": [["globe", "taxi from Chandigarh to Manali", "Google"], ["chatgpt", "Plan a 5-day Himachal trip for a family", "ChatGPT"], ["gemini", "Is Spiti open in October?", "Gemini"], ["perplexity", "Reliable tour operators for Kashmir", "Perplexity"]],
  "financial-services": [["globe", "one time settlement business loan", "Google"], ["chatgpt", "How do I get a loan settlement approved?", "ChatGPT"], ["perplexity", "Best CA firm for startups in Chandigarh", "Perplexity"], ["gemini", "What is the MSME Samadhaan process?", "Gemini"]],
};
