import { px } from "@/lib/images";
import type { Category } from "@/types";

export const categories: Category[] = [
  {
    id: "shampoo",
    name: "Shampoo",
    tagline: "Cleanse & refresh",
    image: px(18066458, 500),
  },
  {
    id: "conditioner",
    name: "Conditioner",
    tagline: "Smooth & hydrate",
    image: px(17407168, 500),
  },
  {
    id: "hair-masks",
    name: "Hair Masks",
    tagline: "Deep repair & nourish",
    image: px(18441533, 500),
  },
  {
    id: "serums-oils",
    name: "Serums & Oils",
    tagline: "Strengthen & grow",
    image: px(16556516, 500),
  },
  {
    id: "personal-care",
    name: "Personal Care",
    tagline: "Daily skin essentials",
    image: px(4841525, 500),
  },
  {
    id: "health-wellness",
    name: "Health & Wellness",
    tagline: "Inner glow & vitality",
    image: px(29060334, 500),
  },
];

export const getCategoryById = (id: string): Category | undefined =>
  categories.find((c) => c.id === id);
