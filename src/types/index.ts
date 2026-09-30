export type CategoryId =
  | "shampoo"
  | "conditioner"
  | "hair-masks"
  | "serums-oils"
  | "personal-care"
  | "health-wellness";

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  gallery: string[];
  category: CategoryId;
  rating: number;
  reviews: number;
  description: string;
  ingredients: string[];
  howToUse: string;
  inStock: boolean;
  badge?: "Bestseller" | "New" | "Sale" | "Limited";
  isNew?: boolean;
  featured?: boolean;
}

export interface Category {
  id: CategoryId;
  name: string;
  tagline: string;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  image: string;
  author: string;
  authorImage: string;
  date: string;
  readTime: string;
  category: string;
}

export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  location: string;
}

export interface User {
  name: string;
  email: string;
}

export interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: "default" | "success" | "warning";
}
