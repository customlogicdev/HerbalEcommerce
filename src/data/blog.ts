import { px } from "@/lib/images";
import type { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    slug: "the-power-of-rosemary-for-hair-growth",
    title: "The Power of Rosemary for Natural Hair Growth",
    excerpt:
      "Discover why rosemary oil has become the internet's favorite natural remedy for thicker, healthier hair — and how to use it correctly.",
    content: [
      "Rosemary has been used for centuries in traditional medicine, but modern research is now revealing what herbalists always knew: this humble herb is a powerhouse for the scalp. Studies suggest that rosemary oil may be as effective as some conventional treatments at supporting hair density.",
      "The secret lies in its ability to improve circulation to the scalp. When massaged in, rosemary oil stimulates blood flow to hair follicles, delivering the oxygen and nutrients they need to thrive. It also contains carnosic acid, a compound linked to nerve growth that can help heal the follicle tissue damaged by styling.",
      "To get the most out of it, consistency matters more than quantity. Apply a few drops of our Rosemary Growth Serum directly to the scalp each night and massage gently for two to three minutes. Within eight to twelve weeks, most users notice reduced shedding and new baby hairs along the hairline.",
    ],
    image: px(6694152, 1200),
    author: "Dr. Elena Marsh",
    authorImage: px(10658352, 200),
    date: "May 12, 2026",
    readTime: "5 min read",
    category: "Hair Care",
  },
  {
    id: "b2",
    slug: "building-a-clean-skincare-routine",
    title: "How to Build a Clean Skincare Routine That Works",
    excerpt:
      "A simple, step-by-step guide to layering botanical ingredients for a glowing complexion — without the guesswork or the ten-step overwhelm.",
    content: [
      "A clean skincare routine isn't about using more products; it's about using the right ones in the right order. Start with a gentle, pH-balanced cleanser that removes impurities without stripping your skin's natural moisture barrier.",
      "Next, hydrate with a toner or essence while your skin is still slightly damp — this locks in water and helps subsequent serums absorb more deeply. Follow with an active serum, such as our Vitamin C Brightening Toner in the morning or the Rosehip Renewal Face Oil at night.",
      "Finally, seal everything in with a moisturizer suited to your skin type, and never skip sunscreen during the day. The golden rule of clean beauty: fewer, high-quality ingredients almost always outperform a crowded shelf.",
    ],
    image: px(4871226, 1200),
    author: "Nadia Petrova",
    authorImage: px(2878431, 200),
    date: "April 28, 2026",
    readTime: "6 min read",
    category: "Skin Care",
  },
  {
    id: "b3",
    slug: "adaptogens-and-inner-glow",
    title: "Adaptogens 101: Your Shortcut to an Inner Glow",
    excerpt:
      "From ashwagandha to spirulina, learn how adaptogenic botanicals help your body manage stress and reflect that balance on your skin.",
    content: [
      "True radiance starts from within, and adaptogens are the botanicals leading the charge. These non-toxic plants help the body resist physical, chemical, and biological stressors, bringing cortisol levels back into balance.",
      "When stress is managed, your skin benefits directly — less inflammation, fewer breakouts, and a healthier barrier. Spirulina, for example, is loaded with protein, iron, and chlorophyll, making it a favorite for supporting detoxification and energy.",
      "Incorporating adaptogens doesn't have to be complicated. A daily scoop of our Spirulina Wellness Powder in a smoothie or a serving of the Green Tea Antioxidant Complex can quietly transform how you look and feel over time.",
    ],
    image: px(9643445, 1200),
    author: "Marcus Bell",
    authorImage: px(1586999, 200),
    date: "April 10, 2026",
    readTime: "4 min read",
    category: "Wellness",
  },
  {
    id: "b4",
    slug: "decoding-natural-ingredient-labels",
    title: "Decoding Natural Ingredient Labels Like a Pro",
    excerpt:
      "Greenwashing is everywhere. Here's how to read an INCI list and spot the genuinely botanical products from the cleverly marketed ones.",
    content: [
      "Not everything labeled 'natural' is created equal. The first step to becoming a savvy shopper is learning to read the INCI (International Nomenclature of Cosmetic Ingredients) list, which is ordered by concentration from highest to lowest.",
      "If a botanical extract appears near the very bottom of the list, it's likely present only in trace amounts. Look instead for ingredients like aloe vera, glycerin, and cold-pressed oils listed among the first few entries.",
      "Be skeptical of vague terms like 'fragrance' or 'parfum,' which can hide dozens of undisclosed chemicals. At Naturaa, we list every ingredient and its source so you always know exactly what you're putting on your body.",
    ],
    image: px(5480035, 1200),
    author: "Dr. Elena Marsh",
    authorImage: px(10658352, 200),
    date: "March 22, 2026",
    readTime: "7 min read",
    category: "Ingredients",
  },
  {
    id: "b5",
    slug: "evening-rituals-for-better-skin",
    title: "Evening Rituals That Reset Your Skin Overnight",
    excerpt:
      "Your skin does its heaviest repair work while you sleep. These calming nighttime habits amplify that natural regeneration process.",
    content: [
      "Nighttime is when your skin shifts into repair mode, cell turnover peaks, and products with active ingredients work their hardest. Building a deliberate evening ritual can dramatically improve your results by morning.",
      "Begin by double-cleansing: an oil or balm to dissolve sunscreen and makeup, followed by a gentle water-based cleanser. Then apply your treatment — a retinol alternative, a nourishing facial oil, or a targeted serum like our CBD Calming Serum.",
      "Don't underestimate the power of wind-down habits. A warm cup of herbal tea, a short breathwork session, and a silk pillowcase all reduce stress and friction, helping you wake up with calmer, clearer skin.",
    ],
    image: px(38343373, 1200),
    author: "Nadia Petrova",
    authorImage: px(2878431, 200),
    date: "March 5, 2026",
    readTime: "5 min read",
    category: "Skin Care",
  },
  {
    id: "b6",
    slug: "sustainable-beauty-habits",
    title: "5 Sustainable Beauty Habits for a Greener Planet",
    excerpt:
      "Small swaps add up. These five eco-friendly habits reduce waste without compromising on the luxury of your daily routine.",
    content: [
      "Sustainability in beauty isn't about perfection; it's about progress. One of the most impactful swaps is replacing single-use products with refillable or solid alternatives, like our cold-process soap bars that come in plastic-free packaging.",
      "Water conservation is another quiet win. Turn off the tap while cleansing, choose concentrated formulas that need less water to rinse, and opt for products with biodegradable ingredients that are kinder to aquatic ecosystems.",
      "Finally, buy less and choose well. Investing in a few multi-purpose, high-performance botanicals reduces clutter, saves money, and keeps your shelf — and the planet — a little cleaner.",
    ],
    image: px(10083956, 1200),
    author: "Marcus Bell",
    authorImage: px(1586999, 200),
    date: "February 18, 2026",
    readTime: "6 min read",
    category: "Sustainability",
  },
];

export const getBlogBySlug = (slug: string): BlogPost | undefined =>
  blogPosts.find((b) => b.slug === slug);
